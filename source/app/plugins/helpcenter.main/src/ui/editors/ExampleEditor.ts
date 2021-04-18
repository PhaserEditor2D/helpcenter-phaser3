/// <reference path="./BaseJSEditor.ts" />
/// <reference path="../properties/ExampleInfoSection.ts" />

namespace helpcenter.main.ui.editors {

    import controls = colibri.ui.controls;

    class ExampleEditorFactory implements colibri.ui.ide.EditorFactory {

        acceptInput(input: any): boolean {

            return input instanceof phaser.core.ExampleInfo && input.isPlayable();
        }

        createEditor(): colibri.ui.ide.EditorPart {

            return new ExampleEditor();
        }

        getName() {

            return "Example Editor";
        }
    }

    export class ExampleEditor extends BaseJSEditor {

        static ID = "helpcenter.main.ui.editors.ExampleEditor";

        private static _factory: colibri.ui.ide.EditorFactory;
        private _propertyProvider: ExampleEditorPropertyProvider;

        static getFactory() {

            return this._factory || (this._factory = new ExampleEditorFactory());
        }

        constructor() {
            super(ExampleEditor.ID, ExampleEditor.getFactory());

            this._propertyProvider = new ExampleEditorPropertyProvider();
        }

        getPropertyProvider() {

            return this._propertyProvider;
        }

        protected getInputContent(): string {

            const input = this.getInput();

            if (input.isMultiFile()) {

                const src = input.getChildren()
                    .filter(c => !c.getPath().endsWith("boot.json"))
                    .map(c => "//\n// Example: " + c.getPath() + "\n//\n\n"
                        + c.getSource() + "\n")
                    .join("");

                return src;
            }

            return input.getSource();
        }

        setInput(input: phaser.core.ExampleInfo) {

            super.setInput(input);

            this.setTitle(input.getName());

            const icon = phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(input);

            this.setIcon(icon || MainPlugin.getInstance().getIcon(ICON_LABS));
        }

        getInput(): phaser.core.ExampleInfo {

            return super.getInput() as phaser.core.ExampleInfo;
        }

        fillContextMenu(menu: controls.Menu) {

            new ExampleMenuCreator(this.getInput().example).build(menu);
        }

        createPart() {

            super.createPart();

            this.setSelection([this.getInput().example]);
        }

        createEditorToolbar(parent: HTMLElement) {

            const manager = new controls.ToolbarManager(parent);

            manager.addAction({
                text: "Play",
                icon: MainPlugin.getInstance().getIcon(ICON_PLAY),
                callback: () => {

                    MainPlugin.getInstance().playExample(this.getInput().example);
                }
            });

            return manager;
        }
    }

    class ExampleEditorPropertyProvider extends controls.properties.PropertySectionProvider {

        addSections(page: controls.properties.PropertyPage, sections: controls.properties.PropertySection<any>[]): void {

            sections.push(
                new properties.ExampleInfoSection(page),
                new properties.ExampleImageSection(page)
            );
        }
    }
}