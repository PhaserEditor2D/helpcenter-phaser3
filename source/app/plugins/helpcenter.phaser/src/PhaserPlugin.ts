namespace helpcenter.phaser {

    export const PHASER_VER = "3.24.1";

    export class PhaserPlugin extends colibri.Plugin {

        private static _instance;
        private _docsFile: core.IJSDocFile;
        private _docsNameMap: Map<string, core.IJSDocEntry>;
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

            const data = await this.getJSON("data/phaser.json");

            const list = new Set();

            for (const entry of data.docs) {

                list.add(entry.kind);
            }

            this.buildModel();
        }

        private buildModel() {

            const entries = this._docsFile.docs;

            // build map

            this._docsNameMap = new Map();

            for (const entry of entries) {

                this._docsNameMap.set(entry.longname, entry);
            }

            // build hierarchy

            for (const entry of entries) {

                // there are entries with scope global that are not member of any other entry
                if (entry.memberof) {

                    const parent = this._docsNameMap.get(entry.memberof);

                    if (parent) {

                        parent.children = parent.children ?? [];
                        parent.children.push(entry);
                        entry.parent = parent;
                    }
                }
            }

            // build folders

            const root = new core.PhaserFile("", true, null);

            const set = new Set();

            for (const entry of entries) {

                set.add(entry.kind);

                const names = entry.meta.path.split("/");

                let folder = root;

                if (entry.meta.path !== entry.meta.filename) {

                    // we are in a folder

                    for (const name of names) {

                        folder = folder.getOrMakeChild(name, true, entry);
                    }
                }

                const file = folder.getOrMakeChild(entry.meta.filename, false, entry);

                file.getDocsEntries().push(new core.DocEntry(entry));

                entry.folder = folder;
                //folder.getDocsEntries().push(new core.DocEntry(entry));
            }

            this.sort(root);

            this._docsFolder = root;

            console.log([...set]);
        }

        private sort(folder: core.PhaserFile) {

            folder.getChildren().sort((a, b) => {

                const aa = a.isFile() ? 1 : 0;
                const bb = b.isFile() ? 1 : 0;

                return aa - bb;
            });

            for (const c of folder.getChildren()) {

                if (c.isFolder()) {

                    this.sort(c);
                }
            }
        }
    }

    colibri.Platform.addPlugin(PhaserPlugin.getInstance());
}