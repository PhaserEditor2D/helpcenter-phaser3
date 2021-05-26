/// <reference path="./AbstractPhaserView.ts"/>

namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export class VersionsView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.files.VersionsView";

        constructor() {
            super(FilesView.ID, false);

            this.setTitle("Versions");
            this.setIcon(MainPlugin.getInstance().getIcon(ICON_TIME));
        }

        protected createViewer(): controls.viewers.TreeViewer {


            const set = new Set(helpcenter.phaser.PhaserPlugin.getInstance().getDocsEntries()
                .map(e => e.getRawEntry().since)
                .filter(since => since));

            const versions = [...set].sort((a, b) => {

                try {

                    return -(Number.parseInt(a.replace(".", ""), 10) - Number.parseInt(b.replace(".", ""), 10));

                } catch (e) {

                    return -a.localeCompare(b);
                }
            });

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setContentProvider(new VersionsContentProvider());
            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
            viewer.setStyledLabelProvider(new ui.viewers.PhaserStyledLabelProvider(true));
            viewer.setInput(versions);

            return viewer;
        }
    }

    class VersionsContentProvider extends ApiContentProvider {

        constructor() {
            super(false, true);
        }

        getRoots(input: any) {

            return input;
        }

        getChildren(parent: any) {

            if (typeof parent === "string") {

                return phaser.PhaserPlugin.getInstance().getDocsEntries()
                    .filter(e => !e.isInherited())
                    .filter(e => e.getRawEntry().since === parent);
            }

            return [];
        }
    }
}