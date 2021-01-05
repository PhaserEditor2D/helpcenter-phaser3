namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export class ExamplesSearchView extends colibri.ui.ide.ViewerView {

        constructor() {
            super("helpcenter.main.ui.views.examples.ExamplesSearchView");

            this.setTitle("Examples Search");
            this.setIcon(MainPlugin.getInstance().getIcon(ICON_LABS));
        }

        protected createViewer(): colibri.ui.controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());

            viewer.setPreloadDisabled();
            viewer.setFilterOnRepaintDisabled();

            viewer.setLabelProvider(new ExampleChainLabelProvider());
            viewer.setStyledLabelProvider(new ExampleChainStyledLabelProvider());
            viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());
            viewer.setCellRendererProvider(
                new controls.viewers.EmptyCellRendererProvider(e => controls.viewers.EmptyCellRenderer.instance));
            viewer.setTreeRenderer(new ExampleChainTreeRenderer(viewer));
            viewer.setInput(phaser.PhaserPlugin.getInstance().getExampleChains());

            return viewer;
        }
    }

    const LANG_STYLES = {
        keyword: "blue",
        built_in: "darkBlue",
        literal: "red",
        number: "brown",
        string: "darkGreen",
        title: "darkCyan",
        attr: "olive",
        comment: "green"
    };

    const stylesCache = {};

    class ExampleChainStyledLabelProvider implements controls.viewers.IStyledLabelProvider {

        getStyledTexts(obj: phaser.core.ExampleChain, dark: boolean): controls.viewers.IStyledText[] {

            let styles = stylesCache[obj.line];

            if (!styles) {

                const tokens = showdown.javascriptToTokens(obj.line);

                styles = tokens.map(token => {
                    return {
                        text: token.value,
                        color: LANG_STYLES[token.kind] || "black"
                    };
                });

                stylesCache[obj.line] = styles;
            }

            return [...styles, {
                text: " " + obj.example.getPath(),
                color: "rgba(0, 0, 0, 0.3)"
            }];
        }
    }

    const EXAMPLE_CHAIN_FONT = controls.FONT_HEIGHT + "px Monospace";

    class ExampleChainTreeRenderer extends controls.viewers.TreeViewerRenderer {

        prepareContextForText(args: controls.viewers.RenderCellArgs) {

            super.prepareContextForText(args);

            args.canvasContext.font = EXAMPLE_CHAIN_FONT;
        }

        // measureText(args: controls.viewers.RenderCellArgs, text: string) {

        //     return Math.floor(controls.FONT_HEIGHT * 0.6 * text.length);
        // }
    }

    class ExampleChainLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: phaser.core.ExampleChain): string {

            return obj.line + " " + obj.example.getPath();
        }
    }
}