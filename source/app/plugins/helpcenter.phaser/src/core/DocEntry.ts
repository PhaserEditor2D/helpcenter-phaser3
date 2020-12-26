namespace helpcenter.phaser.core {

    export class DocEntry {

        private _rawEntry: IJSDocEntry;
        private _children: DocEntry[];
        private _parent: DocEntry;

        constructor(rawEntry: IJSDocEntry) {

            this._rawEntry = rawEntry;
            this._children = [];
        }

        getParent() {

            return this._parent;
        }

        setParent(parent: DocEntry) {

            this._parent = parent;
        }

        isFileRootElement() {

            return !this._parent|| this._parent.getRawEntry().kind === "namespace";
        }

        getChildren() {

            return this._children;
        }

        hasChildren() {

            return this._children.length > 0;
        }

        getRawEntry() {

            return this._rawEntry;
        }
    }
}