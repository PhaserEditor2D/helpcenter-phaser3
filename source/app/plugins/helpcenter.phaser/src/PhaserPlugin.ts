namespace helpcenter.phaser {

    export const PHASER_VER = "3.24.1";

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

                this._examples = data.children.map(child => new core.ExampleInfo(null, child));

                this._exampleMap = new Map();

                this.buildExamplesMap(this._examples);

            }));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                const data = await this.getJSON("data/phaser-examples-code.json");

                // tslint:disable-next-line:forin
                for (const path in data) {

                    const code = data[path] as string;

                    const example = this._exampleMap.get(path) || this._exampleMap.get(path.toLowerCase());

                    if (example) {

                        example.setSource(code);

                    } else {

                        console.error("Missing example for " + path);
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
            reg.addExtension(new core.ExampleEditorInputExtension());
        }

        private buildExamplesMap(examples: core.ExampleInfo[]) {

            for (const e of examples) {

                this._exampleMap.set(e.getPath(), e);

                this.buildExamplesMap(e.getChildren());
            }
        }

        getExamples() {

            return this._examples;
        }

        getExampleByPath(path: string): colibri.ui.ide.IEditorInput {

            return this._exampleMap.get(path);
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
    }

    colibri.Platform.addPlugin(PhaserPlugin.getInstance());
}