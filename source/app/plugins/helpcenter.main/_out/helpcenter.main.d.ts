declare namespace helpcenter.main {
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
        private _filesView;
        private _split1;
        private _namespaceView;
        constructor();
        protected createParts(): void;
        getEditorArea(): colibri.ui.ide.EditorArea;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class PhaserCellRendererProvider implements controls.viewers.ICellRendererProvider {
        getCellRenderer(element: any): controls.viewers.ICellRenderer;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class PhaserLabelProvider implements controls.viewers.ILabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace helpcenter.main.ui.views.files {
    import controls = colibri.ui.controls;
    class FilesView extends colibri.ui.ide.ViewerView {
        static ID: string;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
declare namespace helpcenter.main.ui.views.namespaces {
    import controls = colibri.ui.controls;
    class NamespaceView extends colibri.ui.ide.ViewerView {
        static ID: string;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
//# sourceMappingURL=helpcenter.main.d.ts.map