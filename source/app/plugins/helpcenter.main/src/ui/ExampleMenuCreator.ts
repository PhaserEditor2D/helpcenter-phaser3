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
                    text: "Play",
                    icon: MainPlugin.getInstance().getIcon(ICON_PLAY),
                    callback: () => MainPlugin.getInstance().runExample(this._example)
                });

                if (!(colibri.Platform.getWorkbench().getActivePart() instanceof editors.ExampleEditor)) {

                    menu.addAction({
                        text: "Open In Source Editor",
                        icon: MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT),
                        callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                    });
                }

            } else {

                menu.addAction({
                    text: "Open In Category Editor",
                    icon: MainPlugin.getInstance().getIcon(ICON_HELP),
                    callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                });

                menu.addSeparator();
            }

            menu.addAction({
                text: "Play In Phaser Website",
                callback: () => MainPlugin.getInstance().runExampleInPhaserWebsite(this._example)
            });
        }
    }
}