namespace helpcenter.main.ui.editors {

    import controls = colibri.ui.controls;

    class PhaserFileEditorFactory implements colibri.ui.ide.EditorFactory {

        acceptInput(input: any): boolean {

            return input instanceof phaser.core.PhaserFile && input.isFile();
        }

        createEditor(): colibri.ui.ide.EditorPart {

            return new PhaserFileEditor();
        }

        getName() {

            return "Phaser File Editor";
        }
    }

    export class PhaserFileEditor extends colibri.ui.ide.EditorPart {

        static ID = "helpcenter.main.ui.editors.PhaserFileEditor";

        private static _factory: colibri.ui.ide.EditorFactory;

        static getFactory() {

            return this._factory || (this._factory = new PhaserFileEditorFactory());
        }

        constructor() {
            super(PhaserFileEditor.ID, PhaserFileEditor.getFactory());

            this.setIcon(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
        }

        protected createPart(): void {

            const element = document.createElement("div");
            element.innerHTML = "Hello here!!!";

            this.getElement().appendChild(element);
        }

        setInput(input: phaser.core.PhaserFile) {

            super.setInput(input);

            this.setTitle(input.getName());
        }
    }
}