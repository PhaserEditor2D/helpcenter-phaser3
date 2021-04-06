namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class ExampleMenuCreator {

        private _example: phaser.core.ExampleInfo;

        static addToViewer(viewer: controls.viewers.TreeViewer) {

            viewer.getElement().addEventListener("contextmenu", e => {

                const element = viewer.getSelectionFirstElement();

                if (element instanceof phaser.core.ExampleInfo) {

                    const menu = new controls.Menu();

                    const builder = new ExampleMenuCreator(element);

                    builder.build(menu);

                    menu.createWithEvent(e);
                }
            });
        }

        constructor(example: phaser.core.ExampleInfo) {

            this._example = example;
        }

        build(menu: controls.Menu) {

            if (this._example.getData().type === "file") {

                menu.addAction({
                    text: "Play Example",
                    callback: () => MainPlugin.getInstance().openExampleInWebsite(this._example)
                });

                menu.addAction({
                    text: "Open In Source Editor",
                    callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                });

            } else {

                menu.addAction({
                    text: "Open In Category Editor",
                    callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                });

                menu.addSeparator();

                menu.addAction({
                    text: "Open In Phaser Website",
                    callback: () => MainPlugin.getInstance().openExampleInWebsite(this._example)
                });
            }
        }
    }
}