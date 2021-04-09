namespace helpcenter.main.ui.editors {

    import controls = colibri.ui.controls;

    class JSDocEntryEditorFactory implements colibri.ui.ide.EditorFactory {

        acceptInput(input: any): boolean {

            return input instanceof phaser.core.DocEntry;
        }

        createEditor(): colibri.ui.ide.EditorPart {

            return new JSDocEntryEditor();
        }

        getName() {

            return "Phaser File Editor";
        }
    }

    export class JSDocEntryEditor extends colibri.ui.ide.EditorPart {

        static _factory: JSDocEntryEditorFactory;
        private _contentElement: HTMLDivElement;
        private _themeListener: () => void;

        static getFactory() {

            return this._factory || (this._factory = new JSDocEntryEditorFactory());
        }

        constructor() {
            super("helpcenter.main.ui.editors.JSDocEntryEditor", JSDocEntryEditor.getFactory());

            this.setIcon(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
        }

        protected createPart(): void {

            this._contentElement = document.createElement("div");
            this._contentElement.classList.add("JSDocEntryEditorArea")

            this.getElement().appendChild(this._contentElement);

            this.updateContent();

            this._themeListener = () => this.updateContent();

            colibri.Platform.getWorkbench().eventThemeChanged.addListener(this._themeListener);
        }

        onPartClosed() {

            const result = super.onPartClosed();

            if (result) {

                colibri.Platform.getWorkbench().eventThemeChanged.removeListener(this._themeListener);
            }

            return result;
        }

        layout() {

            super.layout();

            if (this._contentElement) {

                const b = this.getElement().getBoundingClientRect();

                this._contentElement.style.width = b.width + "px";
                this._contentElement.style.height = b.height + "px";
            }
        }

        getInput() {

            return super.getInput() as phaser.core.DocEntry;
        }

        private updateContent() {

            const entry = this.getInput();

            if (entry) {

                const builder = new core.HtmlJSDocBuilder(entry);

                builder.build(this._contentElement);

                this.setTitle(entry.getName() + (entry.getParent() ? " - " + entry.getParent().getFullName() : ""));

            } else {

                this._contentElement.innerHTML = "";

                this.setTitle("JSDocEditor");
            }
        }
    }
}