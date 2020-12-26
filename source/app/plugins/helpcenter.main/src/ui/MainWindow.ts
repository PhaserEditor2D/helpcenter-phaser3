namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class MainWindow extends colibri.ui.ide.WorkbenchWindow {

        static ID = "helpcenter.main.MainWindow"

        private _editorArea: colibri.ui.ide.EditorArea;
        private _navigatorView: views.types.NavigatorView;
        private _split1: controls.SplitPanel;

        constructor() {
            super(MainWindow.ID);
        }

        protected createParts() {

            this._editorArea = new colibri.ui.ide.EditorArea();
            this._navigatorView = new views.types.NavigatorView();

            this._split1 = new controls.SplitPanel(this.createViewFolder(this._navigatorView), this._editorArea);

            this.getClientArea().add(this._split1);

            this._split1.setSplitFactor(0.2);

            this.layout();
        }

        getEditorArea(): colibri.ui.ide.EditorArea {

            return this._editorArea;
        }
    }
}