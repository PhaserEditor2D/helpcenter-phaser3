namespace helpcenter.phaser {

    export let PHASER_VER: string; // loaded in MainPlugin.ts

    export let DEFAULT_PHASER_LABS_URL = "https://labs.phaser.io";

    export const DOC_ENTRY_KIND_LIST = ["namespace", "class", "typedef", "constant", "event", "member", "function"];

    export class PhaserPlugin extends colibri.Plugin {

        private static _instance: PhaserPlugin;
        private _docsFile: core.IJSDocFile;
        private _docsNameMap: Map<string, core.DocEntry>;
        private _docsFolder: core.PhaserFile;
        private _sourceMap: Map<string, string>;
        private _docEntries: core.DocEntry[];
        private _examples: core.ExampleInfo[];
        private _exampleImageReader: ui.ExampleImageReader;
        private _exampleMap: Map<string, core.ExampleInfo>;
        private _exampleChains: core.ExampleChain[];
        private _flatNamespaces: core.DocEntry[];

        static getInstance() {

            return this._instance ? this._instance : this._instance = new PhaserPlugin();
        }

        constructor() {
            super("helpcenter.phaser")
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            // resource loaders

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                this._docsFile = await this.getJSON("data/phaser-docs.json");
            }));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                const data = await this.getJSON("data/phaser-code.json");

                this._sourceMap = new Map();

                // tslint:disable-next-line:forin
                for (const key in data) {

                    this._sourceMap.set(key, data[key]);
                }
            }));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                const data = await this.getJSON("data/phaser-examples.json") as core.IExamplesData;

                this.addTypeToData(data);

                this._examples = data.children.map(child => new core.ExampleInfo(null, child));

                this._exampleMap = new Map();

                this.buildExamplesMap(this._examples);
            }));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                const data = await this.getJSON("data/phaser-examples-code.json");

                // tslint:disable-next-line:forin
                for (const path in data) {

                    const code = data[path] as string;

                    const example = this.getExampleByPath(path);

                    if (example) {

                        example.setSource(code);

                    } else {

                        console.error("Missing example for " + path);
                    }
                }

                this._exampleChains = [];

                const re = /[a-zA-Z]/;

                for (const example of this._exampleMap.values()) {

                    if (example.getData().type === "file" && example.getSource()) {

                        const lines = example.getSource().split("\n");

                        let n = 1;

                        for (const line of lines) {

                            const line2 = line.trim();

                            // TODO: just check the line has a letter
                            if (re.test(line2) && !line2.startsWith("//") && !line2.startsWith("*")) {

                                this._exampleChains.push(new core.ExampleChain(line2, n, example));
                            }

                            n++;
                        }
                    }
                }
            }));


            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                this._exampleImageReader = new ui.ExampleImageReader();

                await this._exampleImageReader.preload();
            }));


            // editor input

            reg.addExtension(new core.PhaserFileEditorInputExtension());
            reg.addExtension(new core.JSDocEntryEditorInputExtension());
            reg.addExtension(new core.ExampleFolderEditorInputExtension());
        }

        private addTypeToData(data: core.IExamplesData) {

            data.type = data.path.endsWith(".js") ? "file" : "directory";

            if (data.type === "directory") {

                data.children = data.children || [];
                
                for (const child of data.children) {

                    this.addTypeToData(child);
                }
            }
        }

        private buildExamplesMap(examples: core.ExampleInfo[]) {

            for (const e of examples) {

                this._exampleMap.set(e.getPath().toLocaleLowerCase(), e);

                this.buildExamplesMap(e.getChildren());
            }
        }

        getPhaserLabsUrl(path?: string) {

            let storeUrl = window.localStorage.getItem("phaser-labs-url") || DEFAULT_PHASER_LABS_URL;

            if (storeUrl && storeUrl.trim().length === 0) {

                storeUrl = DEFAULT_PHASER_LABS_URL;
            }

            const baseUrl = storeUrl || DEFAULT_PHASER_LABS_URL;

            return baseUrl + (path || "");
        }

        setPhaserLabsUrl(url: string) {

            url = url.trim();

            if (url.endsWith("/")) {

                url = url.substring(0, url.length - 2);
            }

            window.localStorage.setItem("phaser-labs-url", url);
        }

        getPhaserLabsPlayExampleUrl(example: core.ExampleInfo, page: "view" | "mobile" | "edit" = "view") {

            if (example.isMultiFileChild()) {

                example = example.getParent();
            }

            if (example.getData().type === "file") {

                return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/" + page + ".html?src=src/" + example.getPath());

            } else if (example.isMultiFile()) {

                return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl(
                    "/boot.html?src=src/" + example.getPath() + "/boot.json");
            }

            return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/index.html?dir=" + example.getPath());
        }

        getExampleChains() {

            return this._exampleChains;
        }

        getExamples() {

            return this._examples;
        }

        getExampleByPath(path: string) {

            return this._exampleMap.get(path.toLocaleLowerCase());
        }

        getExampleImageReader() {

            return this._exampleImageReader;
        }

        getPhaserFileSource(file: string | phaser.core.PhaserFile) {

            const filePath = file instanceof phaser.core.PhaserFile ? file.getPath() : file;

            return this._sourceMap.get(filePath);
        }

        getDocsJSONFile() {

            return this._docsFile;
        }

        getDocsFolder() {

            return this._docsFolder;
        }

        getDocsEntries() {

            return this._docEntries;
        }

        getPhaserFile(filePath: string) {

            const names = filePath.split("/");

            let file = this._docsFolder;

            for (const name of names) {

                file = file.getChild(name);

                if (!file) {

                    return null;
                }
            }

            return file;
        }

        async started() {

            this.buildModel();
        }

        static cleanApiName(name: string) {

            return name.replace("#event:", "#").replace("#", ".");
        }

        private buildModel() {

            const entries = this._docsFile.docs;

            entries.sort((a: core.IJSDocEntry, b: core.IJSDocEntry) => {

                const aa = DOC_ENTRY_KIND_LIST.indexOf(a.kind);
                const bb = DOC_ENTRY_KIND_LIST.indexOf(b.kind);

                return aa - bb;
            });

            const docEntries: core.DocEntry[] = [];

            // build map

            this._docsNameMap = new Map();

            for (const entry of entries) {

                const docEntry = new core.DocEntry(entry);

                this._docsNameMap.set(entry.longname, docEntry);
                this._docsNameMap.set(PhaserPlugin.cleanApiName(entry.longname), docEntry);

                docEntries.push(docEntry);
            }

            // build hierarchy

            for (const entry of docEntries) {

                const memberof = entry.getRawEntry().memberof;

                // there are entries with scope global that are not member of any other entry
                if (memberof) {

                    const parent = this._docsNameMap.get(memberof);

                    if (parent) {

                        parent.getChildren().push(entry);
                        entry.setParent(parent);
                    }
                }
            }

            // sends inherited members to the end
            for (const entry of docEntries) {

                if (entry.getKind() === "class") {

                    entry.getChildren().sort((a, b) => (a.isInherited() ? 1 : 0) - (b.isInherited() ? 1 : 0));
                }
            }

            // build flat
            this._flatNamespaces = [];

            for (const entry of docEntries) {

                if (entry.getKind() === "namespace" || entry.getKind() === "package") {

                    const isFlat = entry.getChildren()
                        .filter(c => !c.isNamespace())
                        .length > 0;

                    if (isFlat) {

                        this._flatNamespaces.push(entry);
                    }
                }
            }

            this._flatNamespaces.sort((a, b) => a.getFullName().localeCompare(b.getFullName()));

            // build folders

            const root = new core.PhaserFile("", true, null);

            for (const docEntry of docEntries) {

                const entry = docEntry.getRawEntry();

                // if (entry.meta.filename === "phaser.js" || entry.meta.filename === "index.js") {

                //     continue;
                // }

                const names = entry.meta.path.split("/");

                let folder = root;

                if (entry.meta.path !== entry.meta.filename) {

                    // we are in a folder

                    for (const name of names) {

                        folder = folder.getOrMakeChild(name, true, docEntry);
                    }
                }

                const file = folder.getOrMakeChild(entry.meta.filename, false, docEntry);

                file.addDocEntry(docEntry);
            }

            this.sortFile(root);

            this._docsFolder = root;

            this._docEntries = docEntries;
        }

        getFlatNamespaces() {

            return this._flatNamespaces;
        }

        findSubtypes(typeName: string) {

            const result: string[] = [];

            for (const entry of this._docEntries) {

                const augments = entry.getRawEntry().augments || [];

                for (const name of augments) {

                    if (name === typeName) {

                        result.push(entry.getFullName());
                    }
                }

            }

            return result;
        }

        private sortFile(folder: core.PhaserFile) {

            folder.getChildren().sort((a, b) => {

                const aa = a.isFile() ? 1 : 0;
                const bb = b.isFile() ? 1 : 0;

                return aa - bb;
            });

            for (const c of folder.getChildren()) {

                if (c.isFolder()) {

                    this.sortFile(c);
                }
            }
        }

        getDocEntry(name: string) {

            return this._docsNameMap.get(name);
        }

        getPhaserDocEntry() {

            return this.getDocEntry("Phaser");
        }
    }

    colibri.Platform.addPlugin(PhaserPlugin.getInstance());
}