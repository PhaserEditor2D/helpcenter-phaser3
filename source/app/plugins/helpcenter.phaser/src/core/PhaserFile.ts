namespace helpcenter.phaser.core {

    export class PhaserFile {

        private _isFolder: boolean;
        private _name: string;
        private _docsEntries: DocEntry[];
        private _children: PhaserFile[];
        private _childrenMap: Map<string, PhaserFile>;
        private _parent: PhaserFile;
        private _docEntry: DocEntry;

        constructor(name: string, isFolder: boolean, docEntry: IJSDocEntry) {

            this._name = name;
            this._isFolder = isFolder;
            this._docEntry = new DocEntry(docEntry);
            this._docsEntries = [];
            this._children = [];
            this._childrenMap = new Map();
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

        getOrMakeChild(name: string, isFolder: boolean, entry: IJSDocEntry) {

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

        getDocsEntries() {

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