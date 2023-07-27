namespace helpcenter.phaser.core {

    export class PhaserFile implements colibri.ui.ide.IEditorInput {

        private _isFolder: boolean;
        private _name: string;
        private _docsEntries: DocEntry[];
        private _children: PhaserFile[];
        private _childrenMap: Map<string, PhaserFile>;
        private _parent: PhaserFile;
        private _docEntry: DocEntry;

        constructor(name: string, isFolder: boolean, docEntry: DocEntry) {

            this._name = name;
            this._isFolder = isFolder;
            this._docEntry = docEntry;
            this._docsEntries = [];
            this._children = [];
            this._childrenMap = new Map();
        }

        getPath() {

            if (this._parent) {

                const parentPath = this._parent.getPath();

                if (parentPath === "") {

                    return this._name;
                }

                return parentPath + "/" + this._name;
            }

            return "";
        }

        getEditorInputExtension(): string {

            return "helpcenter.main.ui.editors.PhaserFileEditorInputExtension";
        }

        getDocEntry() {

            return this._docEntry;
        }

        getChild(name: string) {

            return this._childrenMap.get(name);
        }

        getChildren() {

            return this._children;
        }

        getOrMakeChild(name: string, isFolder: boolean, entry: DocEntry) {

            let folder = this._childrenMap.get(name);

            if (!folder) {

                folder = new PhaserFile(name, isFolder, entry);

                folder._parent = this;
                this._childrenMap.set(name, folder);
                this._children.push(folder);
            }

            return folder;
        }

        getParent() {

            return this._parent;
        }

        addDocEntry(docEntry: DocEntry) {

            this._docsEntries.push(docEntry);

            docEntry.setFile(this);
        }

        getDocEntries() {

            return this._docsEntries;
        }

        getName() {

            return this._name;
        }

        isFolder() {

            return this._isFolder;
        }

        isFile() {

            return !this.isFolder();
        }
    }
}