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

            const wb = colibri.Platform.getWorkbench();
            const activePart = wb.getActivePart();

            menu.addAction({
                text: "Play",
                icon: MainPlugin.getInstance().getIcon(ICON_PLAY),
                callback: () => MainPlugin.getInstance().playExample(this._example)
            });

            if (this._example.getData().type === "file") {

                if (!(activePart instanceof editors.ExampleEditor)) {

                    menu.addAction({
                        text: "Open In Source Editor",
                        icon: MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT),
                        callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                    });
                }

                if (!(activePart instanceof editors.ExampleFolderEditor)) {

                    menu.addAction({
                        text: "Open In Examples Folder Editor",
                        callback: () => {

                            const editor = wb.openEditor(this._example.getParent()) as editors.ExampleFolderEditor;
                            editor.getViewer().setSelection([this._example]);
                            editor.getViewer().reveal(this._example);
                        }
                    });
                }

            } else {

                menu.addAction({
                    text: "Open In Examples Folder Editor",
                    callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                });
            }

            if (!(activePart instanceof views.ExamplesView)) {

                menu.addAction({
                    text: "Reveal In Examples View",
                    callback: () => {

                        const win = wb.getActiveWindow() as ui.MainWindow;

                        win.getExamplesView().getViewer().revealAndSelect(this._example);
                    }
                });
            }
        }
    }
}