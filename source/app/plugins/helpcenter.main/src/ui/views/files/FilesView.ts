/// <reference path="../AbstractPhaserView.ts"/>

namespace helpcenter.main.ui.views.files {

    import controls = colibri.ui.controls;

    export class FilesView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.files.FilesView";

        constructor() {
            super(FilesView.ID);

            this.setTitle("Source Files");
            this.setIcon(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setContentProvider(new FolderContentViewer());
            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
            viewer.setLabelProvider(new ui.viewers.PhaserLabelProvider());
            viewer.setStyledLabelProvider(new ui.viewers.PhaserStyledLabelProvider());
            viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getDocsFolder());

            return viewer;
        }
    }

    class FolderContentViewer implements controls.viewers.ITreeContentProvider {

        getRoots(input: any): any[] {

            const root = input as helpcenter.phaser.core.PhaserFile;

            return root.getChildren();
        }

        getChildren(parent: any): any[] {

            if (parent instanceof helpcenter.phaser.core.PhaserFile) {

                if (parent.isFolder()) {

                    return parent.getChildren();
                }

                return parent.getDocEntries().filter(entry => {

                    return entry.getKind() !== "namespace"
                        && entry.getFile() === parent
                        && (!entry.getParent() || entry.getParent().getFile() !== parent);
                });
            }

            if (parent instanceof phaser.core.DocEntry) {

                // get only doc entries in the same file
                return parent.getChildren().filter(entry => entry.getFile() === parent.getFile());
            }

            return [];
        }
    }
}