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
            viewer.setCellRendererProvider(new ExampleCellRendererProvider());
            viewer.setInput([]);

            return viewer;
        }
    }

    class ExampleCellRendererProvider implements controls.viewers.ICellRendererProvider {

        getCellRenderer(element: phaser.core.ExampleInfo): controls.viewers.ICellRenderer {

            const img = phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(element.getPath());

            if (img) {

                return new controls.viewers.ImageCellRenderer(img);
            }

            if (element.getData().type === "file") {

                return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
            }

            return new controls.viewers.IconImageCellRenderer(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
        }

        async preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult> {

            return controls.PreloadResult.NOTHING_LOADED;
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