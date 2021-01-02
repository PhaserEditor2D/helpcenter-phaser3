namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class ExampleCellRendererProvider implements controls.viewers.ICellRendererProvider {

        getCellRenderer(element: phaser.core.ExampleInfo): controls.viewers.ICellRenderer {

            const img = phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(element.getPath());

            if (img) {

                return new controls.viewers.ImageCellRenderer(img);
            }

            if (element.getData().type === "file") {

                return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getIcon(ICON_LABS));
            }

            return new controls.viewers.IconImageCellRenderer(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
        }

        async preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult> {

            return controls.PreloadResult.NOTHING_LOADED;
        }
    }
}
