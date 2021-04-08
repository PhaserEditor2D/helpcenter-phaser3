namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class MainWindow extends colibri.ui.ide.WorkbenchWindow {

        static ID = "helpcenter.main.MainWindow"

        private _editorArea: colibri.ui.ide.EditorArea;
        private _filesView: views.FilesView;
        private _apiView: views.ApiView;
        private _inspectorView: colibri.inspector.ui.views.InspectorView;
        private _chainsView: views.ApiSearchView;
        private _examplesView: views.ExamplesView;
        private _exampleChainsView: views.ExamplesSearchView;

        constructor() {
            super(MainWindow.ID);
        }

        protected createParts() {

            this._editorArea = new colibri.ui.ide.EditorArea();
            this._filesView = new views.FilesView();
            this._apiView = new views.ApiView();
            this._examplesView = new views.ExamplesView();
            this._inspectorView = new colibri.inspector.ui.views.InspectorView();
            this._chainsView = new views.ApiSearchView();
            this._exampleChainsView = new views.ExamplesSearchView();

            const editorChains = new controls.SplitPanel(this._editorArea, this.createViewFolder(
                this._chainsView,
                this._exampleChainsView
            ), false);

            editorChains.setSplitFactor(0.5);

            const splitLeftTopDown = new controls.SplitPanel(
                this.createViewFolder(
                    this._apiView,
                    this._filesView,
                ), this.createViewFolder(
                    this._examplesView
                ), false);

            const splitLeftAndEditorArea = new controls.SplitPanel(splitLeftTopDown, editorChains);

            splitLeftAndEditorArea.setSplitFactor(0.3);

            const splitAllLeftAndInspector = new controls.SplitPanel(splitLeftAndEditorArea, this.createViewFolder(this._inspectorView));

            splitAllLeftAndInspector.setSplitFactor(0.8);

            this.getClientArea().add(splitAllLeftAndInspector);

            this.layout();
        }

        getEditorArea(): colibri.ui.ide.EditorArea {

            return this._editorArea;
        }
    }
}