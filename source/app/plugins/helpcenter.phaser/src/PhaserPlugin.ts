namespace helpcenter.phaser {

    export const PHASER_VER = "3.24.1";

    export const DOC_ENTRY_KIND_LIST = ["namespace", "class", "typedef", "constant", "event", "member", "function"];

    export class PhaserPlugin extends colibri.Plugin {

        private static _instance;
        private _docsFile: core.IJSDocFile;
        private _docsNameMap: Map<string, core.DocEntry>;
        private _docsFolder: core.PhaserFile;

        static getInstance() {

            return this._instance ? this._instance : this._instance = new PhaserPlugin();
        }

        constructor() {
            super("helpcenter.phaser")
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {

                this._docsFile = await this.getJSON("data/phaser.json");
            }));
        }

        getDocsJSONFile() {

            return this._docsFile;
        }

        getDocsFolder() {

            return this._docsFolder;
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

                if (entry.meta.filename === "phaser.js" || entry.meta.filename === "index.js") {

                    continue;
                }

                const names = entry.meta.path.split("/");

                let folder = root;

                if (entry.meta.path !== entry.meta.filename) {

                    // we are in a folder

                    for (const name of names) {

                        folder = folder.getOrMakeChild(name, true, docEntry);
                    }
                }

                const file = folder.getOrMakeChild(entry.meta.filename, false, docEntry);

                file.getDocsEntries().push(docEntry);
            }

            this.sortFile(root);

            this._docsFolder = root;
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