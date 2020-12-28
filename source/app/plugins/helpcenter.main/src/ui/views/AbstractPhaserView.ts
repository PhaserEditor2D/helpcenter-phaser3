namespace helpcenter.main.ui.views {

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

                    } else if (element instanceof phaser.core.DocEntry) {

                        const file = element.getFile();

                        const editor = colibri.Platform.getWorkbench().openEditor(file);

                        if (editor) {

                            const phaserEditor = editor as ui.editors.PhaserFileEditor;

                            const entry = element.getRawEntry();

                            phaserEditor.scrollToLine(entry.meta.lineno + entry.meta.commentLines, entry.meta.columnno);
                        }
                    }
                }
            });
        }

        getPropertyProvider() {

            return this._propertySectionProvider;
        }
    }
}