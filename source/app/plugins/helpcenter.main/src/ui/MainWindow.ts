namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class MainWindow extends colibri.ui.ide.WorkbenchWindow {

        static ID = "helpcenter.main.MainWindow"

        private _editorArea: colibri.ui.ide.EditorArea;
        private _filesView: views.files.FilesView;
        private _namespaceView: views.api.ApiView;
        private _inspectorView: colibri.inspector.ui.views.InspectorView;
        private _chainsView: views.chains.ChainsView;
        private _examplesView: views.examples.ExamplesView;
        private _exampleChainsView: views.examples.ExampleChainsView;

        constructor() {
            super(MainWindow.ID);
        }

        protected createParts() {

            this._editorArea = new colibri.ui.ide.EditorArea();
            this._filesView = new views.files.FilesView();
            this._namespaceView = new views.api.ApiView();
            this._examplesView = new views.examples.ExamplesView();
            this._inspectorView = new colibri.inspector.ui.views.InspectorView();
            this._chainsView = new views.chains.ChainsView();
            this._exampleChainsView = new views.examples.ExampleChainsView();

            const editorChains = new controls.SplitPanel(this._editorArea, this.createViewFolder(
                this._chainsView,
                this._exampleChainsView
            ), false);

            editorChains.setSplitFactor(0.5);

            const splitLeftAndEditorArea = new controls.SplitPanel(
                this.createViewFolder(
                    this._namespaceView,
                    this._filesView,
                    this._examplesView
                ),
                editorChains);

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