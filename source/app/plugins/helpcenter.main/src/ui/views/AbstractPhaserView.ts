namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export abstract class AbstractPhaserView extends colibri.ui.ide.ViewerView {

        private _propertySectionProvider = new properties.PhaserSectionProvider();

        createPart() {

            super.createPart();

            const viewer = this.getViewer();

            viewer.eventOpenItem.addListener(e => {

                const element = viewer.getSelectionFirstElement();

                if (element) {

                    if (element instanceof phaser.core.PhaserFile && element.isFile()) {

                        colibri.Platform.getWorkbench().openEditor(element);

                    } else if (phaser.core.DocEntry.canAdapt(element)) {

                        const docEntry = phaser.core.DocEntry.getDocEntry(element);

                        MainPlugin.getInstance().openPhaserFileEditor(docEntry);
                    }
                }
            });
        }

        getPropertyProvider() {

            return this._propertySectionProvider;
        }

        fillContextMenu(menu: controls.Menu) {

            super.fillContextMenu(menu);

            const element = this.getViewer().getSelectionFirstElement();

            if (phaser.core.DocEntry.canAdapt(element)) {

                const entry = phaser.core.DocEntry.getDocEntry(element);

                new DocEntryMenuCreator(entry).createMenu(menu);
            }
        }
    }
}