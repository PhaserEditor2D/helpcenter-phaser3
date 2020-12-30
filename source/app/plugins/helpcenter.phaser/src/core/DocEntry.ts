namespace helpcenter.phaser.core {

    export class DocEntry {

        private _rawEntry: IJSDocEntry;
        private _children: DocEntry[];
        private _parent: DocEntry;
        private _file: PhaserFile;

        constructor(rawEntry: IJSDocEntry) {

            this._rawEntry = rawEntry;
            this._children = [];
        }

        static canAdapt(obj: any) {

            return this.getDocEntry(obj) instanceof DocEntry;
        }

        static getDocEntry(obj: any) {

            if (obj instanceof DocEntry) {

                return obj;
            }

            if ("adaptToDocEntry" in obj) {

                const entry = obj["adaptToDocEntry"]();

                if (entry instanceof DocEntry) {

                    return entry;
                }
            }

            return null;
        }

        getFile() {

            return this._file;
        }

        setFile(file: PhaserFile) {

            this._file = file;
        }

        getParent() {

            return this._parent;
        }

        setParent(parent: DocEntry) {

            this._parent = parent;
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

        isInherited() {

            return this._rawEntry.inherited === true;
        }

        getType() {

            return this._rawEntry.type;
        }

        getKind() {

            return this._rawEntry.kind;
        }

        getDescription() {

            return this._rawEntry.description || "";
        }

        getName() {

            return this._rawEntry.name;
        }

        getFullName() {

            return this._rawEntry.longname.replace("#", ".");
        }

        getMethodSignature() {

            if (this._rawEntry.kind === "function") {

                const params = this._rawEntry.params || [];

                return `(${params.map(p => p.name).join(", ")})`;
            }

            return "";
        }

        getReturnsTypeSignature() {

            if (this._rawEntry.returns) {

                return ": " + this._rawEntry.returns.flatMap(r => r.type.names).join("|");
            }

            return "";
        }

        getTypeSignature() {

            if (this._rawEntry.type) {

                return ": " + this._rawEntry.type.names.join("|");
            }

            return "";
        }
    }
}