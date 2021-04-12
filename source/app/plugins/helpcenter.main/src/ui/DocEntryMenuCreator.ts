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
        }
    }
}