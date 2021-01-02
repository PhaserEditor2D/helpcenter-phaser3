namespace helpcenter.main.ui.editors {

    import controls = colibri.ui.controls;

    class ExampleFolderEditorFactory implements colibri.ui.ide.EditorFactory {

        acceptInput(input: any): boolean {

            return input instanceof phaser.core.ExampleInfo && input.getData().type === "directory";
        }

        createEditor(): colibri.ui.ide.EditorPart {

            return new ExampleFolderEditor();
        }

        getName() {

            return "Example Category Editor";
        }
    }

    export class ExampleFolderEditor extends colibri.ui.ide.EditorPart {

        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        static _factory: ExampleFolderEditorFactory;
        private _gridRenderer: controls.viewers.GridTreeViewerRenderer;
        private _propertyProvider: properties.ExampleSectionProvider;

        static getFactory() {

            return this._factory ? this._factory : (this._factory = new ExampleFolderEditorFactory());
        }

        constructor() {
            super("helpcenter.main.ui.editors.ExampleFolderEditor", ExampleFolderEditor.getFactory());
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());

            viewer.setLabelProvider(new ExampleFolderLabelProvider());
            viewer.setContentProvider(new ExampleFolderContentProvider([]));
            viewer.setCellRendererProvider(new ui.viewers.ExampleCellRendererProvider());

            this._gridRenderer = new controls.viewers.GridTreeViewerRenderer(viewer);
            viewer.setTreeRenderer(this._gridRenderer);
            viewer.setInput([]);

            return viewer;
        }

        getPropertyProvider() {

            return this._propertyProvider ? this._propertyProvider : (this._propertyProvider = new properties.ExampleSectionProvider());
        }

        protected createPart(): void {

            this._viewer = this.createViewer();

            this.addClass("ViewerPart");

            this._filteredViewer = this.createFilteredViewer(this._viewer);
            this.add(this._filteredViewer);

            this._viewer.eventSelectionChanged.addListener(sel => {

                this.setSelection(sel as any);
            });

            this._viewer.getElement().addEventListener("contextmenu", e => this.onMenu(e));

            this._viewer.eventOpenItem.addListener(e => {

                const example = this._viewer.getSelectionFirstElement() as phaser.core.ExampleInfo;

                if (example) {

                    colibri.Platform.getWorkbench().openEditor(example);
                }
            });

            this.updateContent();
        }

        protected createFilteredViewer(viewer: controls.viewers.TreeViewer) {

            return new controls.viewers.FilteredViewer(viewer, true);
        }

        private onMenu(e: MouseEvent) {

            e.preventDefault();

            this._viewer.onMouseUp(e);

            const menu = new controls.Menu();

            this.fillContextMenu(menu);

            menu.createWithEvent(e);
        }

        protected fillContextMenu(menu: controls.Menu) {
            // nothing
        }

        getViewer() {
            return this._viewer;
        }

        layout() {

            if (this._filteredViewer) {

                this._filteredViewer.layout();
            }
        }

        setInput(input: phaser.core.ExampleInfo) {

            super.setInput(input);

            this.updateContent();
        }

        getInput() {

            return super.getInput() as phaser.core.ExampleInfo;
        }

        private updateContent() {

            const input = this.getInput();

            if (input) {

                if (this._viewer) {

                    const sections = [];
                    this.buildSections(input, sections);

                    const examples: phaser.core.ExampleInfo[] = [];
                    this.getAllExamples(input, examples);

                    this._gridRenderer.setSections(sections);
                    this._viewer.setContentProvider(new ExampleFolderContentProvider(examples));
                    this._viewer.setInput([]);

                    let images = examples
                        .map(e => phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(e.getPath()))
                        .filter(e => e !== undefined)

                    if (images.length > 0) {

                        images = [
                            images[0],
                            images[Math.floor(images.length * 0.25)],
                            images[Math.floor(images.length * 0.75)],
                            images[Math.floor(images.length - 1)]
                        ];
                    }

                    this.setIcon(new controls.MultiImage(images, 128, 128));
                }

                this.setTitle(input.getName());
            }
        }

        private buildSections(input: phaser.core.ExampleInfo, sections: any[]) {

            sections.push(input.getPath());

            for (const child of input.getChildren()) {

                if (child.getChildren().length > 0) {

                    this.buildSections(child, sections);
                }
            }
        }

        private getAllExamples(example: phaser.core.ExampleInfo, list: any[]) {

            if (example.getData().type === "file") {

                list.push(example);

            } else {

                for (const child of example.getChildren()) {

                    this.getAllExamples(child, list);
                }
            }
        }
    }

    class ExampleFolderLabelProvider extends controls.viewers.LabelProvider {

        getLabel(obj: phaser.core.ExampleInfo | string) {

            if (obj instanceof phaser.core.ExampleInfo) {

                return obj.getName();
            }

            return obj
                .split("/")
                .join(" / ")
                .split(" ")
                .map(n => n.substring(0, 1).toUpperCase() + n.substring(1))
                .join(" ");
        }
    }

    class ExampleFolderContentProvider implements controls.viewers.ITreeContentProvider {

        private _examples: phaser.core.ExampleInfo[];

        constructor(examples: phaser.core.ExampleInfo[]) {

            this._examples = examples;
        }

        getRoots(input: any): any[] {

            return this._examples;
        }

        getChildren(parent: any): any[] {

            if (parent instanceof phaser.core.ExampleInfo) {

                return [];
            }

            const path = parent as string;

            return this._examples.filter(e => e.getParent().getPath() === path);
        }
    }
}