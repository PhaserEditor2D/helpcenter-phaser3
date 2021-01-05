namespace helpcenter.main.ui.views.examples {

    import controls = colibri.ui.controls;

    export class ExampleChainsView extends colibri.ui.ide.ViewerView {

        constructor() {
            super("helpcenter.main.ui.views.examples.ExampleChainsView");

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

    class ExampleChainStyledLabelProvider implements controls.viewers.IStyledLabelProvider {

        getStyledTexts(obj: phaser.core.ExampleChain, dark: boolean): controls.viewers.IStyledText[] {

            return [{
                text: obj.line,
                color: "darkBlue"
            },
            {
                text: " " + obj.example.getPath(),
                color: "rgba(0, 0, 0, 0.3)"
            }];
        }
    }

    class ExampleChainTreeRenderer extends controls.viewers.TreeViewerRenderer {

        prepareContextForText(args: controls.viewers.RenderCellArgs) {

            super.prepareContextForText(args);

            args.canvasContext.font = controls.FONT_HEIGHT + "px Monospace";
        }
    }

    class ExampleChainLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: phaser.core.ExampleChain): string {

            return obj.line + " " + obj.example.getPath();
        }
    }
}