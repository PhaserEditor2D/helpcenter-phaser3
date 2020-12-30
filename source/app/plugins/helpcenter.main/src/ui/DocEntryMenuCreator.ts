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
                callback: e => MainPlugin.getInstance().openPhaserFileEditor(this._docEntry)
            });

            menu.addAction({
                text: "Open In Documentation Editor",
                callback: e => colibri.Platform.getWorkbench().openEditor(this._docEntry)
            });
        }
    }
}