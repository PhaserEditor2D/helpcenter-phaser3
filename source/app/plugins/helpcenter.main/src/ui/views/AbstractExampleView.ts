namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export class AbstractExampleView extends colibri.ui.ide.ViewerView {

        private _propertyProvider: properties.ExampleSectionProvider;

        getPropertyProvider() {

            if (!this._propertyProvider) {

                this._propertyProvider = new ui.properties.ExampleSectionProvider();
            }

            return this._propertyProvider;
        }

        fillContextMenu(menu: controls.Menu) {

            const example = this.getViewer().getSelectionFirstElement();

            if (example instanceof phaser.core.ExampleInfo) {

                new ExampleMenuCreator(example).build(menu);
            }
        }

        createViewer() {

            const viewer = new controls.viewers.TreeViewer(this.getId());

            viewer.setLabelProvider(new ui.viewers.ExampleLabelProvider());
            viewer.setContentProvider(new ui.viewers.ExampleContentProvider());
            viewer.setCellRendererProvider(new ui.viewers.ExampleCellRendererProvider());
            viewer.setInput([]);

            viewer.eventOpenItem.addListener(e => {

                const example = viewer.getSelectionFirstElement() as phaser.core.ExampleInfo;

                if (example) {

                    if (example.getData().type === "file") {

                        MainPlugin.getInstance().openExampleInWebsite(example);

                    } else {

                        colibri.Platform.getWorkbench().openEditor(example);
                    }
                }
            });

            return viewer;
        }
    }
}