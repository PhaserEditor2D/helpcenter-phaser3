/// <reference path="./BaseJSEditor.ts" />

namespace helpcenter.main.ui.editors {

    class ExampleEditorFactory implements colibri.ui.ide.EditorFactory {

        acceptInput(input: any): boolean {

            return input instanceof phaser.core.ExampleInfo && input.getData().type === "file";
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

        static getFactory() {

            return this._factory || (this._factory = new ExampleEditorFactory());
        }

        constructor() {
            super(ExampleEditor.ID, ExampleEditor.getFactory());
        }

        protected getInputContent(): string {

            return this.getInput().getSource();
        }

        setInput(input: phaser.core.ExampleInfo) {

            super.setInput(input);

            this.setTitle(input.getName());

            const icon = phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(input.getPath());

            this.setIcon(icon || MainPlugin.getInstance().getIcon(ICON_LABS));
        }

        getInput(): phaser.core.ExampleInfo {

            return super.getInput() as phaser.core.ExampleInfo;
        }
    }
}