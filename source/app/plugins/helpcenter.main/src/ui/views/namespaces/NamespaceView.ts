namespace helpcenter.main.ui.views.namespaces {

    import controls = colibri.ui.controls;

    export class NamespaceView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.classes.NamespaceView";

        constructor() {
            super(NamespaceView.ID);

            this.setTitle("API");
            this.setIcon(MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setContentProvider(new NamespaceContentViewer());
            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
            viewer.setLabelProvider(new ui.viewers.PhaserLabelProvider());
            viewer.setStyledLabelProvider(new ui.viewers.PhaserStyledLabelProvider());
            viewer.setInput([]);

            return viewer;
        }
    }

    class NamespaceContentViewer implements controls.viewers.ITreeContentProvider {

        getRoots(input: any): any[] {

            return [phaser.PhaserPlugin.getInstance().getDocEntry("Phaser")];
        }

        getChildren(parent: any): any[] {

            if (parent instanceof phaser.core.DocEntry) {

                return parent.getChildren();
            }

            return [];
        }
    }
}