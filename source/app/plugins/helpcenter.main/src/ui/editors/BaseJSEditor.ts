namespace helpcenter.main.ui.editors {

    export abstract class BaseJSEditor extends colibri.ui.ide.EditorPart {

        private _codeEditor: CodeMirror.Editor;
        private _scrollTo: { line: number, ch: number };

        protected abstract getInputContent(): string;

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

        private updateContent() {

            const input = this.getInput();

            let source = "";

            if (input) {

                source = this.getInputContent();
            }

            if (this._codeEditor) {

                this._codeEditor.setValue(source || "");

                this.doScrollToLine();
            }
        }
    }
}