namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class DocEntryMenuCreator {

        private _docEntry: phaser.core.DocEntry;

        constructor(docEntry: phaser.core.DocEntry) {

            this._docEntry = docEntry
        }

        createMenu(menu: controls.Menu) {

            menu.addAction({
                text: "Open In Source Editor",
                icon: MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT),
                callback: e => MainPlugin.getInstance().openPhaserFileEditor(this._docEntry)
            });

            menu.addAction({
                text: "Open In Documentation Editor",
                icon: MainPlugin.getInstance().getIcon(ICON_HELP),
                callback: e => colibri.Platform.getWorkbench().openEditor(this._docEntry)
            });

            if (!(colibri.Platform.getWorkbench().getActivePart() instanceof views.ApiView)) {

                menu.addAction({
                    text: "Reveal In API View",
                    icon: MainPlugin.getInstance().getDocEntryKindIcon("namespace"),
                    callback: () => {
                        const view = (colibri.Platform.getWorkbench().getActiveWindow() as ui.MainWindow)
                            .getApiView();
                        view.getPartFolder().selectTabWithContent(view);
                        view.getViewer().revealAndSelect(this._docEntry);
                    }
                });
            }

            if (!(colibri.Platform.getWorkbench().getActivePart() instanceof views.FilesView)) {

                menu.addAction({
                    text: "Reveal In Phaser Files View",
                    icon: colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER),
                    callback: () => {
                        const view = (colibri.Platform.getWorkbench().getActiveWindow() as ui.MainWindow)
                            .getPhaserFilesView();
                        view.getPartFolder().selectTabWithContent(view);
                        view.getViewer().revealAndSelect(this._docEntry);
                    }
                });
            }
        }
    }
}