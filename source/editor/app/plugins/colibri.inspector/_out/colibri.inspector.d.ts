declare namespace colibri.inspector {
    class InspectorPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): InspectorPlugin;
        private constructor();
    }
}
declare namespace colibri.inspector.ui.views {
    import controls = colibri.ui.controls;
    import ide = colibri.ui.ide;
    class InspectorView extends ide.ViewPart {
        static VIEW_ID: string;
        private _propertyPage;
        private _currentPart;
        private _selectionListener;
        constructor();
        static updateInspectorView(selection: any[]): void;
        layout(): void;
        protected createPart(): void;
        private onWorkbenchPartActivate;
        private onPartSelection;
        getUndoManager(): ide.undo.UndoManager;
        getPropertyPage(): controls.properties.PropertyPage;
    }
}
//# sourceMappingURL=colibri.inspector.d.ts.map