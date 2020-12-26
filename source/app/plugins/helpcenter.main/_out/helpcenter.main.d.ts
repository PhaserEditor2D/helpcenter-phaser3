declare namespace helpcenter.main {
    const DOC_ENTRY_KIND_LIST: string[];
    const DOC_ENTRY_KIND_ICON_NAME: {
        member: string;
        function: string;
        namespace: string;
        typedef: string;
        class: string;
        event: string;
        constant: string;
    };
    const ICON_FILE_SCRIPT = "file-script";
    class MainPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): MainPlugin;
        constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        getDocEntryKindIcon(kind: string): colibri.ui.controls.IconImage;
        openFirstWindow(): void;
    }
    const VER = "1.0.0";
}
declare namespace helpcenter.main.ui {
    class MainWindow extends colibri.ui.ide.WorkbenchWindow {
        static ID: string;
        private _editorArea;
        private _navigatorView;
        private _split1;
        constructor();
        protected createParts(): void;
        getEditorArea(): colibri.ui.ide.EditorArea;
    }
}
declare namespace helpcenter.main.ui.views.types {
    import controls = colibri.ui.controls;
    class NavigatorView extends colibri.ui.ide.ViewerView {
        static ID: string;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
//# sourceMappingURL=helpcenter.main.d.ts.map