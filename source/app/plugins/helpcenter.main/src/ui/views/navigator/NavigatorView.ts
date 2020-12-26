namespace helpcenter.main.ui.views.types {

    import controls = colibri.ui.controls;

    export class NavigatorView extends colibri.ui.ide.ViewerView {
        static ID = "helpcenter.main.ui.views.types.NavigatorView";

        constructor() {
            super(NavigatorView.ID);

            this.setTitle("Navigator");
        }


        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setContentProvider(new FolderContentViewer());
            viewer.setLabelProvider(new NavigatorLabelProvider());
            viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getDocsFolder());
            viewer.setCellRendererProvider(new PhaserFileRendererProvider());

            return viewer;
        }
    }

    class PhaserFileRendererProvider implements controls.viewers.ICellRendererProvider {

        getCellRenderer(element: any): controls.viewers.ICellRenderer {

            if (element instanceof phaser.core.PhaserFile) {

                if (element.isFolder()) {

                    return new controls.viewers.IconImageCellRenderer(
                        colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                }
            }

            if (element instanceof phaser.core.DocEntry) {

                const kind = element.getRawEntry().kind;

                return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getDocEntryKindIcon(kind));
            }

            return new controls.viewers.IconImageCellRenderer(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
        }

        async preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult> {

            return controls.PreloadResult.NOTHING_LOADED;
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

                return parent.getDocsEntries();
            }

            return [];
        }
    }

    class NavigatorLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: any): string {

            if (obj instanceof helpcenter.phaser.core.PhaserFile) {

                return obj.getName();
            }

            if (obj instanceof phaser.core.DocEntry) {

                return obj.getRawEntry().longname;
            }

            return "";
        }
    }
}