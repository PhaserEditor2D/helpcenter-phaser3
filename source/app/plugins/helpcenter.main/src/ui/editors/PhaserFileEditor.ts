namespace helpcenter.main.ui.editors {

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
        private _codeEditor: CodeMirror.Editor;
        private _scrollTo: { line: number, ch: number };

        static getFactory() {

            return this._factory || (this._factory = new PhaserFileEditorFactory());
        }

        constructor() {
            super(PhaserFileEditor.ID, PhaserFileEditor.getFactory());

            this.setIcon(MainPlugin.getInstance().getIcon(ICON_FILE_SCRIPT));
        }

        protected createPart(): void {

            this._codeEditor = CodeMirror(this.getElement(), {
                mode: "javascript",
                readOnly: true,
                lineNumbers: true
            });

            this.updateContent();
        }

        scrollToLine(line: number, ch: number) {

            this._scrollTo = { line, ch };

            if (this._codeEditor) {

                this.doScrollToLine();
            }
        }

        private doScrollToLine() {

            if (this._scrollTo) {

                this._codeEditor.scrollIntoView({
                    line: this._scrollTo.line,
                    ch: this._scrollTo.ch
                }, this.getElement().getBoundingClientRect().height / 2);

                this._codeEditor.setSelection({
                    line: this._scrollTo.line - 1,
                    ch: 0,
                }, {
                    line: this._scrollTo.line,
                    ch: 0,
                });

                this._scrollTo = null;
            }
        }

        layout() {

            super.layout();

            if (this._codeEditor) {

                const element = this._codeEditor.getWrapperElement();

                const b = this.getElement().getBoundingClientRect();

                element.style.width = b.width + "px";
                element.style.height = b.height + "px";

                this._codeEditor.refresh();
            }
        }

        setInput(input: phaser.core.PhaserFile) {

            super.setInput(input);

            this.setTitle(input.getName());
        }

        getInput(): phaser.core.PhaserFile {

            return super.getInput() as phaser.core.PhaserFile;
        }

        private updateContent() {

            const input = this.getInput();

            let source = "";

            if (input) {

                source = phaser.PhaserPlugin.getInstance().getFileSource(input);
            }

            if (this._codeEditor) {

                this._codeEditor.setValue(source || "");

                this.doScrollToLine();
            }
        }
    }
}