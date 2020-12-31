namespace helpcenter.main.ui.views.examples {

    import controls = colibri.ui.controls;

    export class ExamplesView extends colibri.ui.ide.ViewerView {

        constructor() {
            super("helpcenter.main.ui.views.examples.ExamplesView");

            this.setTitle("Examples");
            this.setIcon(MainPlugin.getInstance().getIcon(ICON_LABS));
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setLabelProvider(new ExampleLabelProvider());
            viewer.setContentProvider(new ExampleContentProvider());
            viewer.setCellRendererProvider(new controls.viewers.EmptyCellRendererProvider());
            viewer.setInput([]);

            return viewer;
        }
    }

    class ExampleLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: phaser.core.ExampleInfo): string {

            return obj.getName();
        }
    }

    class ExampleContentProvider implements controls.viewers.ITreeContentProvider {

        getRoots(input: any): any[] {

            return phaser.PhaserPlugin.getInstance().getExamples();
        }

        getChildren(parent: phaser.core.ExampleInfo): any[] {

            return parent.getChildren();
        }
    }
}