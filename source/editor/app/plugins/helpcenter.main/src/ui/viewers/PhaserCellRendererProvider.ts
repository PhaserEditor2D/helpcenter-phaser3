namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class PhaserCellRendererProvider implements controls.viewers.ICellRendererProvider {

        getCellRenderer(element: any): controls.viewers.ICellRenderer {

            if (typeof element === "string") {

                return new controls.viewers.IconImageCellRenderer(
                    MainPlugin.getInstance().getIcon(ICON_TIME));
            }

            if (element instanceof phaser.core.PhaserFile) {

                if (element.isFolder()) {

                    return new controls.viewers.IconImageCellRenderer(
                        colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                }
            }

            if (element instanceof phaser.core.DocEntry) {

                return PhaserCellRendererProvider.getDocEntryCellRenderer(element);
            }

            return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
        }

        static getDocEntryCellRenderer(docEntry: phaser.core.DocEntry) {

            const kind = docEntry.getRawEntry().kind;

            return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getDocEntryKindIcon(kind));
        }

        async preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult> {

            return controls.PreloadResult.NOTHING_LOADED;
        }
    }
}