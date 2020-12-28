namespace helpcenter.main.ui {

    import controls = colibri.ui.controls;

    export class MainWindow extends colibri.ui.ide.WorkbenchWindow {

        static ID = "helpcenter.main.MainWindow"

        private _editorArea: colibri.ui.ide.EditorArea;
        private _filesView: views.files.FilesView;
        private _namespaceView: views.namespaces.NamespaceView;
        private _inspectorView: colibri.inspector.ui.views.InspectorView;

        constructor() {
            super(MainWindow.ID);
        }

        protected createParts() {

            this._editorArea = new colibri.ui.ide.EditorArea();
            this._filesView = new views.files.FilesView();
            this._namespaceView = new views.namespaces.NamespaceView();
            this._inspectorView = new colibri.inspector.ui.views.InspectorView();

            const splitLeftAndEditorArea = new controls.SplitPanel(
                this.createViewFolder(this._namespaceView, this._filesView),
                this._editorArea);

            splitLeftAndEditorArea.setSplitFactor(0.2);

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