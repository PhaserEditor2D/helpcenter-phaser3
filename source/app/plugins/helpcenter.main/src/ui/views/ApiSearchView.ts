namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export class ApiSearchView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.classes.ExamplesSearchView";

        constructor() {
            super(ApiSearchView.ID);

            this.setTitle("API Search");
            this.setIcon(MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());
            viewer.setCellRendererProvider(new ChainsCellRendererProvider());
            viewer.setLabelProvider(new ChainsLabelProvider());
            viewer.setStyledLabelProvider(new ChainsStyledLabelProvider());
            viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());
            viewer.setTreeRenderer(new ChainsTreeRenderer(viewer));

            const model = new ChainsModel();
            model.build();

            viewer.setInput(model.getChains());

            return viewer;
        }
    }

    class ChainsTreeRenderer extends controls.viewers.TreeViewerRenderer {

        prepareContextForText(args: controls.viewers.RenderCellArgs) {

            super.prepareContextForText(args);

            args.canvasContext.font = controls.FONT_HEIGHT + "px Monospace";
        }

    }

    class ChainsStyledLabelProvider implements controls.viewers.IStyledLabelProvider {

        private _labelProvider = new ChainsLabelProvider();

        getStyledTexts(obj: any, dark: boolean): controls.viewers.IStyledText[] {

            if (obj instanceof Chain) {

                return obj.styledLabel;
            }

            return [{
                text: this._labelProvider.getLabel(obj),
                color: controls.Controls.getTheme().viewerForeground
            }]
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

        public docEntry: phaser.core.DocEntry;

        public label: string;

        public styledLabel: controls.viewers.IStyledText[];

        public countDots: number;

        adaptToDocEntry() {

            return this.docEntry;
        }
    }

    class ChainsModel {

        private _chains: Chain[];

        build() {

            this._chains = [];

            const root = phaser.PhaserPlugin.getInstance().getDocEntry("Phaser");

            this.buildAll(root, "Phaser", 1);

            this._chains.sort((a, b) => {

                return a.countDots - b.countDots;
            });
        }

        getChains() {

            return this._chains;
        }

        private buildAll(parent: phaser.core.DocEntry, parentLabel: string, depth: number) {

            if (depth < 0) {

                return;
            }

            for (const child of parent.getChildren()) {

                // if (child.isInherited()) {

                //     continue;
                // }

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
                    chain.countDots = chain.label.split("").filter(c => c === ".").length;

                    chain.styledLabel = [{
                        text: child.getKind() + " ",
                        color: "blue"
                    }, {
                        text: entryFullName,
                        color: controls.Controls.getTheme().viewerForeground
                    },
                    {
                        text: child.getTypeSignature(),
                        color: "darkCyan"
                    }, {
                        text: child.getMethodSignature(),
                        color: "brown"
                    }, {
                        text: child.getReturnsTypeSignature(),
                        color: "darkCyan"
                    }];

                    chain.styledLabel = chain.styledLabel.filter(s => s.text.length > 0);

                    chain.docEntry = child;

                    this._chains.push(chain);

                    this.buildAll(child, baseLabel, depth);

                    const type = child.getType();

                    if (type) {

                        for (const name of type.names) {

                            if (name === "Phaser.Scene" || name === "Phaser.Game" || name === "Phaser.GameObjects.GameObject") {

                                continue;
                            }

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