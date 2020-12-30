namespace helpcenter.main.ui.views.chains {

    import controls = colibri.ui.controls;

    export class ChainsView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.classes.ChainsView";

        constructor() {
            super(ChainsView.ID);

            this.setTitle("API Chains");
            this.setIcon(MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setCellRendererProvider(new ChainsCellRendererProvider());
            viewer.setLabelProvider(new ChainsLabelProvider());
            viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());

            const model = new ChainsModel();
            model.build();

            viewer.setInput(model.getChains());

            return viewer;
        }
    }

    class ChainsLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: any): string {

            if (obj instanceof Chain) {

                return obj.label;
            }

            return "";
        }
    }

    class ChainsCellRendererProvider implements controls.viewers.ICellRendererProvider {

        getCellRenderer(element: any): controls.viewers.ICellRenderer {

            if (element instanceof Chain) {

                return ui.viewers.PhaserCellRendererProvider.getDocEntryCellRenderer(element.docEntry);
            }

            return controls.viewers.EmptyCellRenderer.instance;
        }

        async preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult> {

            return controls.PreloadResult.NOTHING_LOADED;
        }
    }

    class Chain {

        public docEntry;

        public label;
    }

    class ChainsModel {

        private _chains: Chain[];

        build() {

            this._chains = [];

            const root = phaser.PhaserPlugin.getInstance().getDocEntry("Phaser");

            this.buildAll(root, "Phaser", 1);
        }

        getChains() {

            return this._chains;
        }

        private buildAll(parent: phaser.core.DocEntry, parentLabel: string, depth: number) {

            if (depth < 0) {

                return;
            }

            for (const child of parent.getChildren()) {

                if (child.isInherited()) {

                    continue;
                }

                const entryFullName = parentLabel + "." + child.getName();

                if (child.getKind() === "namespace") {

                    this.buildAll(child, entryFullName, depth);

                } else {

                    const chain = new Chain();

                    const baseLabel = entryFullName
                        + child.getTypeSignature()
                        + child.getMethodSignature()
                        + child.getReturnsTypeSignature();

                    chain.label = child.getKind() + " " + baseLabel;

                    chain.docEntry = child;

                    this._chains.push(chain);

                    this.buildAll(child, baseLabel, depth);

                    const type = child.getType();

                    if (type) {

                        for (const name of type.names) {

                            const typeEntry = phaser.PhaserPlugin.getInstance().getDocEntry(name);

                            if (typeEntry) {

                                this.buildAll(typeEntry, entryFullName, depth - 1);
                            }
                        }
                    }
                }
            }
        }
    }
}