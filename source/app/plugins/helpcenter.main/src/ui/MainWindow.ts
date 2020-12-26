namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class MainWindow extends colibri.ui.ide.WorkbenchWindow {

        static ID = "helpcenter.main.MainWindow"

        private _editorArea: colibri.ui.ide.EditorArea;
        private _filesView: views.files.FilesView;
        private _split1: controls.SplitPanel;
        private _namespaceView: views.namespaces.NamespaceView;

        constructor() {
            super(MainWindow.ID);
        }

        protected createParts() {

            this._editorArea = new colibri.ui.ide.EditorArea();
            this._filesView = new views.files.FilesView();
            this._namespaceView = new views.namespaces.NamespaceView();

            this._split1 = new controls.SplitPanel(
                this.createViewFolder(this._namespaceView, this._filesView),
                this._editorArea);

            this.getClientArea().add(this._split1);

            this._split1.setSplitFactor(0.2);

            this.layout();
        }

        getEditorArea(): colibri.ui.ide.EditorArea {

            return this._editorArea;
        }
    }
}