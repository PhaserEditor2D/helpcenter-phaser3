declare namespace helpcenter.main {
    type IElectronMessage = {
        method: string;
        body?: any;
    };
    interface IElectron {
        sendMessage(msg: IElectronMessage): void;
        sendMessageSync(msg: IElectronMessage): any;
    }
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
    const ICON_LABS = "experimental";
    const ICON_HELP = "help";
    const ICON_PLAY = "play";
    const ICON_TIME = "time";
    class MainPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): MainPlugin;
        constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        getDocEntryKindIcon(kind: string): colibri.ui.controls.IconImage;
        openFirstWindow(): void;
        playExample(example: phaser.core.ExampleInfo): void;
        openPhaserFileEditor(docEntry: phaser.core.DocEntry): void;
        onElectron(yesCallback: (electron: IElectron) => void, noCallback?: () => {}): void;
    }
}
declare function initElectron(): void;
declare namespace helpcenter.main.core {
    class HtmlJSDocBuilder {
        private _docEntry;
        private _labelProvider;
        constructor(docEntry: phaser.core.DocEntry);
        build(element: HTMLElement): void;
        private renderMembers;
        private renderMemberIcon;
        private renderReturns;
        private renderExtends;
        private renderSubtypes;
        private renderSince;
        private renderFires;
        private renderFunctionParams;
        private renderLinkToApi;
        private renderDescription;
        private renderSignature;
    }
}
declare namespace helpcenter.main.ui {
    import controls = colibri.ui.controls;
    class DocEntryMenuCreator {
        private _docEntry;
        constructor(docEntry: phaser.core.DocEntry);
        createMenu(menu: controls.Menu): void;
    }
}
declare namespace helpcenter.main.ui {
    import controls = colibri.ui.controls;
    class ExampleMenuCreator {
        private _example;
        static addToViewer(viewer: controls.viewers.TreeViewer): void;
        constructor(example: phaser.core.ExampleInfo);
        build(menu: controls.Menu): void;
    }
}
declare namespace helpcenter.main.ui {
    class MainWindow extends colibri.ui.ide.WorkbenchWindow {
        static ID: string;
        private _editorArea;
        private _filesView;
        private _apiView;
        private _inspectorView;
        private _chainsView;
        private _examplesView;
        private _exampleChainsView;
        private _versionsView;
        constructor();
        getApiView(): views.ApiView;
        getExamplesView(): views.ExamplesView;
        getPhaserFilesView(): views.FilesView;
        private saveWindowState;
        saveState(prefs: colibri.core.preferences.Preferences): void;
        restoreState(prefs: colibri.core.preferences.Preferences): void;
        protected createParts(): void;
        private initStateEvents;
        private initToolbar;
        getEditorArea(): colibri.ui.ide.EditorArea;
    }
}
declare namespace helpcenter.main.ui {
    const LIGHT_SYNTAX_COLOR: {
        keyword: string;
        built_in: string;
        literal: string;
        number: string;
        string: string;
        title: string;
        attr: string;
        comment: string;
        methodSignature: string;
        returnTypeSignature: string;
        typeSignature: string;
    };
    const DARK_SYNTAX_COLOR: {
        keyword: string;
        built_in: string;
        literal: string;
        number: string;
        string: string;
        title: string;
        attr: string;
        comment: string;
        methodSignature: string;
        returnTypeSignature: string;
        typeSignature: string;
    };
}
declare namespace helpcenter.main.ui.dialogs {
    import controls = colibri.ui.controls;
    class AboutDialog extends controls.dialogs.Dialog {
        constructor();
        createDialogArea(): void;
        create(): void;
    }
}
declare namespace helpcenter.main.ui.dialogs {
    import controls = colibri.ui.controls;
    class PlayDialog extends controls.dialogs.Dialog {
        private _example;
        private _gameFrame;
        constructor(example: phaser.core.ExampleInfo);
        createDialogArea(): void;
        create(): void;
    }
}
declare namespace helpcenter.main.ui.dialogs {
    import controls = colibri.ui.controls;
    class SettingsDialog extends controls.dialogs.Dialog {
        private _phaserLabsUrlText;
        createDialogArea(): void;
        create(): void;
    }
}
declare namespace helpcenter.main.ui.editors {
    import controls = colibri.ui.controls;
    abstract class BaseJSEditor extends colibri.ui.ide.EditorPart {
        private _codeEditor;
        private _scrollTo;
        private _themeListener;
        protected abstract getInputContent(): string;
        protected createPart(): void;
        protected fillContextMenu(menu: controls.Menu): void;
        getCodeEditor(): CodeMirror.Editor;
        onPartClosed(): boolean;
        private updateEditorWithTheme;
        scrollToLine(line: number, ch: number): void;
        private doScrollToLine;
        layout(): void;
        private updateContent;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class ExampleInfoSection extends controls.properties.PropertySection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {
        constructor(page: controls.properties.PropertyPage, id?: string);
        createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.editors {
    import controls = colibri.ui.controls;
    class ExampleEditorFactory implements colibri.ui.ide.EditorFactory {
        acceptInput(input: any): boolean;
        createEditor(): colibri.ui.ide.EditorPart;
        getName(): string;
    }
    export class ExampleEditor extends BaseJSEditor {
        static ID: string;
        private static _factory;
        private _propertyProvider;
        static getFactory(): colibri.ui.ide.EditorFactory | ExampleEditorFactory;
        constructor();
        getPropertyProvider(): ExampleEditorPropertyProvider;
        protected getInputContent(): string;
        setInput(input: phaser.core.ExampleInfo): void;
        getInput(): phaser.core.ExampleInfo;
        fillContextMenu(menu: controls.Menu): void;
        createPart(): void;
        createEditorToolbar(parent: HTMLElement): controls.ToolbarManager;
    }
    class ExampleEditorPropertyProvider extends controls.properties.PropertySectionProvider {
        addSections(page: controls.properties.PropertyPage, sections: controls.properties.PropertySection<any>[]): void;
    }
    export {};
}
declare namespace helpcenter.main.ui.editors {
    import controls = colibri.ui.controls;
    class ExampleFolderEditorFactory implements colibri.ui.ide.EditorFactory {
        acceptInput(input: any): boolean;
        createEditor(): colibri.ui.ide.EditorPart;
        getName(): string;
    }
    export class ExampleFolderEditor extends colibri.ui.ide.EditorPart {
        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        static _factory: ExampleFolderEditorFactory;
        private _gridRenderer;
        private _propertyProvider;
        static getFactory(): ExampleFolderEditorFactory;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
        getPropertyProvider(): properties.ExampleSectionProvider;
        protected createPart(): void;
        protected createFilteredViewer(viewer: controls.viewers.TreeViewer): controls.viewers.FilteredViewer<controls.viewers.TreeViewer>;
        protected fillContextMenu(menu: controls.Menu): void;
        createEditorToolbar(parent: HTMLElement): controls.ToolbarManager;
        getViewer(): controls.viewers.TreeViewer;
        layout(): void;
        setInput(input: phaser.core.ExampleInfo): void;
        getInput(): phaser.core.ExampleInfo;
        private updateContent;
        private buildSections;
        private getAllExamples;
    }
    export {};
}
declare namespace helpcenter.main.ui.editors {
    class JSDocEntryEditorFactory implements colibri.ui.ide.EditorFactory {
        acceptInput(input: any): boolean;
        createEditor(): colibri.ui.ide.EditorPart;
        getName(): string;
    }
    export class JSDocEntryEditor extends colibri.ui.ide.EditorPart {
        static _factory: JSDocEntryEditorFactory;
        private _contentElement;
        private _themeListener;
        static getFactory(): JSDocEntryEditorFactory;
        constructor();
        protected createPart(): void;
        onPartClosed(): boolean;
        layout(): void;
        getInput(): phaser.core.DocEntry;
        setInput(entry: phaser.core.DocEntry): void;
        private updateContent;
    }
    export {};
}
declare namespace helpcenter.main.ui.editors {
    class PhaserFileEditorFactory implements colibri.ui.ide.EditorFactory {
        acceptInput(input: any): boolean;
        createEditor(): colibri.ui.ide.EditorPart;
        getName(): string;
    }
    export class PhaserFileEditor extends BaseJSEditor {
        static ID: string;
        private static _factory;
        static getFactory(): colibri.ui.ide.EditorFactory | PhaserFileEditorFactory;
        constructor();
        protected getInputContent(): string;
        setInput(input: phaser.core.PhaserFile): void;
        getInput(): phaser.core.PhaserFile;
    }
    export {};
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    abstract class AbstractFileSection extends controls.properties.PropertySection<any> {
        abstract getFileInfo(): {
            filename: string;
            path: string;
        };
        createForm(parent: HTMLDivElement): void;
        canEditNumber(n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class DescriptionSection extends controls.properties.PropertySection<phaser.core.DocEntry> {
        constructor(page: controls.properties.PropertyPage);
        createForm(parent: HTMLDivElement): void;
        hasMenu(): boolean;
        createMenu(menu: controls.Menu): void;
        getDocEntry(): phaser.core.DocEntry;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class DocEntryFileSection extends AbstractFileSection {
        constructor(page: controls.properties.PropertyPage);
        getFileInfo(): {
            filename: string;
            path: string;
        };
        canEdit(obj: any, n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class ExampleImageSection extends colibri.ui.ide.properties.BaseImagePreviewSection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {
        constructor(page: controls.properties.PropertyPage);
        protected getSelectedImage(): colibri.ui.controls.IImage;
        createForm(parent: HTMLDivElement): void;
        getExample(): phaser.core.ExampleInfo;
        canEdit(obj: any, n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class ExampleSectionProvider extends controls.properties.PropertySectionProvider {
        addSections(page: controls.properties.PropertyPage, sections: Array<controls.properties.PropertySection<any>>): void;
        getEmptySelectionObject(): any;
        getEmptySelectionArray(): any[];
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class ExampleSourceSection extends controls.properties.PropertySection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {
        constructor(page: controls.properties.PropertyPage);
        createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class FileSection extends AbstractFileSection {
        constructor(page: controls.properties.PropertyPage);
        getFileInfo(): {
            filename: string;
            path: string;
        };
        canEdit(obj: any, n: number): boolean;
    }
}
declare namespace helpcenter.main.ui.properties {
    import controls = colibri.ui.controls;
    class PhaserSectionProvider extends controls.properties.PropertySectionProvider {
        addSections(page: controls.properties.PropertyPage, sections: Array<controls.properties.PropertySection<any>>): void;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class ExampleCellRendererProvider implements controls.viewers.ICellRendererProvider {
        getCellRenderer(element: phaser.core.ExampleInfo): controls.viewers.ICellRenderer;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class ExampleContentProvider implements controls.viewers.ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: phaser.core.ExampleInfo): any[];
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class ExampleLabelProvider implements controls.viewers.ILabelProvider {
        getLabel(obj: phaser.core.ExampleInfo): string;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class PhaserCellRendererProvider implements controls.viewers.ICellRendererProvider {
        getCellRenderer(element: any): controls.viewers.ICellRenderer;
        static getDocEntryCellRenderer(docEntry: phaser.core.DocEntry): controls.viewers.IconImageCellRenderer;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class PhaserLabelProvider implements controls.viewers.ILabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace helpcenter.main.ui.viewers {
    import controls = colibri.ui.controls;
    class PhaserStyledLabelProvider implements controls.viewers.IStyledLabelProvider {
        private _labelProvider;
        private _showFullName;
        constructor(showFullName?: boolean);
        getStyledTexts(obj: any, dark: boolean): controls.viewers.IStyledText[];
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    class AbstractExampleView extends colibri.ui.ide.ViewerView {
        private _propertyProvider;
        getPropertyProvider(): properties.ExampleSectionProvider;
        fillContextMenu(menu: controls.Menu): void;
        createViewer(): controls.viewers.TreeViewer;
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    abstract class AbstractPhaserView extends colibri.ui.ide.ViewerView {
        private _propertySectionProvider;
        createPart(): void;
        getPropertyProvider(): properties.PhaserSectionProvider;
        fillContextMenu(menu: controls.Menu): void;
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    type TSection = "Types" | "Events" | "Constants";
    export class ApiView extends AbstractPhaserView {
        static ID: string;
        private _flatLayout;
        private _showInherited;
        private _section;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
        fillContextMenu(menu: controls.Menu): void;
        updateViewer(): void;
    }
    export class ApiContentProvider implements controls.viewers.ITreeContentProvider {
        private _section;
        private _flat;
        private _showInherited;
        constructor(showInherited: boolean, flat: boolean, section?: TSection);
        setSection(section: any): void;
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
    export {};
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    class ChainsView extends AbstractPhaserView {
        static ID: string;
        private _model;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    class ExamplesSearchView extends colibri.ui.ide.ViewerView {
        static ID: string;
        private _propertyProvider;
        constructor();
        fillContextMenu(menu: controls.Menu): void;
        protected createViewer(): colibri.ui.controls.viewers.TreeViewer;
        getPropertyProvider(): properties.ExampleSectionProvider;
    }
    class ExampleChainCellRendererProvider implements controls.viewers.ICellRendererProvider {
        private _provider;
        constructor();
        getCellRenderer(obj: phaser.core.ExampleChain): controls.viewers.ICellRenderer;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
declare namespace helpcenter.main.ui.views {
    class ExamplesView extends AbstractExampleView {
        constructor();
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    class FilesView extends AbstractPhaserView {
        static ID: string;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
declare namespace helpcenter.main.ui.views {
    import controls = colibri.ui.controls;
    class VersionsView extends AbstractPhaserView {
        static ID: string;
        constructor();
        protected createViewer(): controls.viewers.TreeViewer;
    }
}
//# sourceMappingURL=helpcenter.main.d.ts.map