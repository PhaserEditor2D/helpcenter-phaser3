namespace helpcenter.main.ui.views.files {

    import controls = colibri.ui.controls;

    export class FilesView extends colibri.ui.ide.ViewerView {
        static ID = "helpcenter.main.ui.views.files.NavigatorView";

        constructor() {
            super(FilesView.ID);

            this.setTitle("Files");
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

                return parent.getDocsEntries().filter(entry => entry.isFileRootElement() && entry.getKind() !== "namespace");
            }

            if (parent instanceof phaser.core.DocEntry) {

                return parent.getChildren();
            }

            return [];
        }
    }
}