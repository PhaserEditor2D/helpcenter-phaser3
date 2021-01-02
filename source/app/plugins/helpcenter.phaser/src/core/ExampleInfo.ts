namespace helpcenter.phaser.core {

    export class ExampleInfo implements colibri.ui.ide.IEditorInput {

        private _data: IExamplesData;
        private _name: string;
        private _path: string;
        private _parent: ExampleInfo;
        private _source: string;
        private _children: ExampleInfo[];

        constructor(parent: ExampleInfo, data: IExamplesData) {

            this._parent = parent;
            this._data = data;

            this._path = data.path.replaceAll("\\", "/").substring(4);

            {
                let name = data.name;

                name = data.type === "file" ? name.substring(0, name.lastIndexOf(".")) : name;

                this._name = name.split(" ").filter(n => n.length > 0).map(w => {

                    return w[0].toUpperCase() + w.substring(1, w.length);

                }).join(" ");
            }

            this._children = [];

            if (data.type === "directory") {

                for (const child of data.children) {

                    if (child.name.startsWith("_")) {

                        continue;
                    }

                    this._children.push(new ExampleInfo(this, child));
                }
            }

            this._children.sort((a, b) => a.getData().type.localeCompare(b.getData().type));

        }

        getEditorInputExtension(): string {

            return ExampleEditorInputExtension.ID;
        }

        getChildren() {

            return this._children;
        }

        getSource() {

            return this._source;
        }

        setSource(source: string) {

            this._source = source;
        }

        getPath() {

            return this._path;
        }

        getName() {

            return this._name;
        }

        getParent() {

            return this._parent;
        }

        getData() {

            return this._data;
        }
    }
}