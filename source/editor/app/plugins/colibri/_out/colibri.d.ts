declare namespace colibri {
    abstract class Plugin {
        private _id;
        private _iconCache;
        private _loadIconsFromAtlas;
        private _loadResources;
        private _atlasImage;
        private _atlasData;
        private _resources;
        constructor(id: string, config?: {
            loadIconsFromAtlas?: boolean;
            loadResources?: boolean;
        });
        getId(): string;
        starting(): Promise<void>;
        started(): Promise<void>;
        getResources(): ui.ide.Resources;
        preloadResources(): Promise<void>;
        preloadAtlasIcons(): Promise<void>;
        registerExtensions(registry: ExtensionRegistry): void;
        getIconDescriptor(name: string): ui.controls.IconDescriptor;
        getIcon(name: string, common?: boolean): ui.controls.IconImage;
        getIconsAtlasImage(): ui.controls.IImage;
        getFrameDataFromIconsAtlas(frame: string): ui.controls.IAtlasFrameData;
        private getThemeIcon;
        private getIconsAtlasFrameName;
        getPluginURL(pathInPlugin: string): string;
        getResourceURL(pathInPlugin: string): string;
        getJSON(pathInPlugin: string): Promise<any>;
        getString(pathInPlugin: string): Promise<string>;
    }
}
declare namespace colibri {
    let PRODUCT_VERSION: string;
    class Platform {
        private static _plugins;
        private static _extensionRegistry;
        private static _product;
        static addPlugin(plugin: colibri.Plugin): void;
        static getPlugins(): Plugin[];
        static getExtensionRegistry(): ExtensionRegistry;
        static getExtensions<T extends Extension>(point: string): T[];
        static addExtension(...extensions: Extension[]): void;
        static getWorkbench(): ui.ide.Workbench;
        static loadProduct(bypassCache?: boolean): Promise<void>;
        static start(): Promise<void>;
        static getProduct(): IProduct;
        static getProductOption(key: string): any;
        static getElectron(): IElectron;
        static onElectron(callback: (electron: IElectron) => void, elseCallback?: () => void): void;
        static isOnElectron(): boolean;
    }
}
declare namespace colibri.ui.controls {
    class Control {
        eventControlLayout: ListenerList<unknown>;
        eventSelectionChanged: ListenerList<unknown>;
        private _bounds;
        private _element;
        private _children;
        private _layout;
        private _container;
        private _scrollY;
        private _layoutChildren;
        private _handlePosition;
        constructor(tagName?: string, ...classList: string[]);
        static getControlOf(element: HTMLElement): Control;
        static getParentControl(element: HTMLElement): any;
        isHandlePosition(): boolean;
        setHandlePosition(_handlePosition: boolean): void;
        get style(): CSSStyleDeclaration;
        isLayoutChildren(): boolean;
        setLayoutChildren(layout: boolean): void;
        getScrollY(): number;
        setScrollY(scrollY: number): void;
        getContainer(): Control;
        getLayout(): ILayout;
        setLayout(layout: ILayout): void;
        addClass(...tokens: string[]): void;
        removeClass(...tokens: string[]): void;
        containsClass(className: string): boolean;
        getElement(): HTMLElement;
        getControlPosition(windowX: number, windowY: number): {
            x: number;
            y: number;
        };
        containsLocalPoint(x: number, y: number): boolean;
        setBounds(bounds: IBounds): void;
        setBoundsValues(x: number, y: number, w: number, h: number): void;
        getBounds(): IBounds;
        setLocation(x: number, y: number): void;
        layout(): void;
        protected layoutChildren(): void;
        dispatchLayoutEvent(): void;
        add(control: Control): void;
        remove(control: Control): void;
        protected onControlAdded(): void;
        protected onControlRemoved(): void;
        getChildren(): Control[];
    }
}
declare namespace colibri.ui.controls {
    enum PreloadResult {
        NOTHING_LOADED = 0,
        RESOURCES_LOADED = 1
    }
    const DEVICE_PIXEL_RATIO: number;
    const DEVICE_PIXEL_RATIO_x2: boolean;
    const ICON_SIZE: number;
    const RENDER_ICON_SIZE = 16;
    type IImageOrCanvas = HTMLImageElement | HTMLCanvasElement;
    class Controls {
        private static _images;
        private static _applicationDragData;
        private static _mouseDownElement;
        private static _dragCanvas;
        static init(): void;
        static addTabStop(): void;
        static getMouseDownElement(): HTMLElement;
        static adjustCanvasDPI(canvas: HTMLCanvasElement, widthHint?: number, heightHint?: number): CanvasRenderingContext2D;
        private static _charWidthMap;
        private static _textWidthMap;
        static measureTextWidth(context: CanvasRenderingContext2D, label: string): number;
        static setDragEventImage(e: DragEvent, render: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): void;
        private static initDragCanvas;
        private static _isSafari;
        static isSafariBrowser(): boolean;
        static getApplicationDragData(): any[];
        static getApplicationDragDataAndClean(): any[];
        static setApplicationDragData(data: any[]): void;
        static resolveAll(list: Array<Promise<PreloadResult>>): Promise<PreloadResult>;
        static resolveResourceLoaded(): Promise<PreloadResult>;
        static resolveNothingLoaded(): Promise<PreloadResult>;
        static getImage(url: string, id: string, appendVersion?: boolean): IImage;
        static openUrlInNewPage(url: string): void;
        static LIGHT_THEME: ITheme;
        static DARK_THEME: ITheme;
        static DEFAULT_THEME: ITheme;
        static _theme: ITheme;
        static switchTheme(): ITheme;
        static setTheme(theme: ITheme): void;
        static preloadTheme(): void;
        static restoreTheme(): void;
        static getTheme(): ITheme;
        static drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, stroke?: boolean, topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number): void;
    }
}
declare namespace colibri.ui.ide {
    class Workbench {
        private static _workbench;
        static getWorkbench(): Workbench;
        eventPartDeactivated: controls.ListenerList<Part>;
        eventPartActivated: controls.ListenerList<Part>;
        eventEditorDeactivated: controls.ListenerList<EditorPart>;
        eventEditorActivated: controls.ListenerList<EditorPart>;
        eventBeforeOpenProject: controls.ListenerList<unknown>;
        eventProjectOpened: controls.ListenerList<unknown>;
        eventThemeChanged: controls.ListenerList<controls.ITheme>;
        private _fileStringCache;
        private _fileImageCache;
        private _fileImageSizeCache;
        private _activeWindow;
        private _contentType_icon_Map;
        private _fileStorage;
        private _contentTypeRegistry;
        private _activePart;
        private _activeEditor;
        private _activeElement;
        private _editorRegistry;
        private _commandManager;
        private _windows;
        private _globalPreferences;
        private _projectPreferences;
        private _editorSessionStateRegistry;
        private constructor();
        getEditorSessionStateRegistry(): Map<string, any>;
        getGlobalPreferences(): core.preferences.Preferences;
        getProjectPreferences(): core.preferences.Preferences;
        showNotification(text: string, clickCallback?: () => void): void;
        launch(): Promise<void>;
        private hideSplash;
        private resetCache;
        openProject(monitor: controls.IProgressMonitor): Promise<void>;
        private preloadProjectResources;
        private registerWindows;
        getWindows(): WorkbenchWindow[];
        activateWindow(id: string): WorkbenchWindow;
        private preloadPluginResources;
        private registerContentTypeIcons;
        private initCommands;
        private initEvents;
        private registerEditors;
        getFileStringCache(): core.io.FileStringCache;
        getFileStorage(): core.io.IFileStorage;
        getCommandManager(): commands.CommandManager;
        getActiveDialog(): controls.dialogs.Dialog;
        getActiveWindow(): WorkbenchWindow;
        getActiveElement(): HTMLElement;
        getActivePart(): Part;
        getActiveEditor(): EditorPart;
        setActiveEditor(editor: EditorPart): void;
        /**
         * Users may not call this method. This is public only for convenience.
         */
        setActivePart(part: Part): void;
        private toggleActivePartClass;
        private findTabPane;
        private registerContentTypes;
        findPart(element: HTMLElement): Part;
        getContentTypeRegistry(): core.ContentTypeRegistry;
        getProjectRoot(): core.io.FilePath;
        getContentTypeIcon(contentType: string): controls.IImage;
        getFileImage(file: core.io.FilePath): FileImage;
        getFileImageSizeCache(): ImageSizeFileCache;
        getWorkbenchIcon(name: string): controls.IconImage;
        getEditorRegistry(): EditorRegistry;
        getEditors(): EditorPart[];
        getOpenEditorsWithInput(input: ui.ide.IEditorInput): EditorPart[];
        makeEditor(input: IEditorInput, editorFactory?: EditorFactory): EditorPart;
        createEditor(input: IEditorInput, editorFactory?: EditorFactory): EditorPart;
        getEditorInputExtension(input: IEditorInput): EditorInputExtension;
        getEditorInputExtensionWithId(id: string): EditorInputExtension;
        openEditor(input: IEditorInput, editorFactory?: EditorFactory): EditorPart;
    }
}
declare namespace colibri {
    let CAPABILITY_FILE_STORAGE: boolean;
    const ICON_FILE = "file";
    const ICON_FOLDER = "folder";
    const ICON_PLUS = "plus";
    const ICON_ZOOM_IN = "zoom_in";
    const ICON_ZOOM_OUT = "zoom_out";
    const ICON_MINUS = "minus";
    const ICON_DELETE = "delete";
    const ICON_ZOOM_RESET = "zoom-reset";
    const ICON_MENU = "menu";
    const ICON_SMALL_MENU = "small-menu";
    const ICON_CHECKED = "checked";
    const ICON_KEYMAP = "keymap";
    const ICON_COLOR = "color";
    const ICON_CONTROL_TREE_COLLAPSE = "tree-collapse";
    const ICON_CONTROL_TREE_EXPAND = "tree-expand";
    const ICON_CONTROL_TREE_EXPAND_LEFT = "tree-expand-left";
    const ICON_CONTROL_TREE_COLLAPSE_LEFT = "tree-collapse-left";
    const ICON_CONTROL_SECTION_COLLAPSE = "section-collapse";
    const ICON_CONTROL_SECTION_COLLAPSE_LEFT = "section-collapse-left";
    const ICON_CONTROL_SECTION_EXPAND = "section-expand";
    const ICON_CONTROL_CLOSE = "close";
    const ICON_CONTROL_DIRTY = "dirty";
    const ICON_INSPECTOR = "inspector";
    class ColibriPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): ColibriPlugin;
        private constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
    }
}
declare namespace colibri {
    interface IElectronMessage {
        method: string;
        body?: any;
    }
    interface IElectron {
        sendMessage(msg: IElectronMessage): any;
        sendMessageSync(msg: IElectronMessage): any;
    }
}
declare namespace colibri {
    class Extension {
        static DEFAULT_PRIORITY: number;
        private _extensionPoint;
        private _priority;
        constructor(extensionPoint: string, priority?: number);
        getExtensionPoint(): any;
        getPriority(): number;
        setPriority(priority: number): void;
    }
}
declare namespace colibri {
    class ExtensionRegistry {
        private _map;
        constructor();
        addExtension(...extensions: Extension[]): void;
        getExtensions<T extends Extension>(point: string): T[];
    }
}
declare namespace colibri {
    interface IProduct {
        title: string;
        version: string;
    }
}
declare namespace exprEval {
    type Value = number | string | ((...args: Value[]) => Value) | {
        [propertyName: string]: Value;
    };
    interface Values {
        [propertyName: string]: Value;
    }
    interface ParserOptions {
        allowMemberAccess?: boolean;
        operators?: {
            add?: boolean;
            comparison?: boolean;
            concatenate?: boolean;
            conditional?: boolean;
            divide?: boolean;
            factorial?: boolean;
            logical?: boolean;
            multiply?: boolean;
            power?: boolean;
            remainder?: boolean;
            subtract?: boolean;
            sin?: boolean;
            cos?: boolean;
            tan?: boolean;
            asin?: boolean;
            acos?: boolean;
            atan?: boolean;
            sinh?: boolean;
            cosh?: boolean;
            tanh?: boolean;
            asinh?: boolean;
            acosh?: boolean;
            atanh?: boolean;
            sqrt?: boolean;
            log?: boolean;
            ln?: boolean;
            lg?: boolean;
            log10?: boolean;
            abs?: boolean;
            ceil?: boolean;
            floor?: boolean;
            round?: boolean;
            trunc?: boolean;
            exp?: boolean;
            length?: boolean;
            in?: boolean;
            random?: boolean;
            min?: boolean;
            max?: boolean;
            assignment?: boolean;
            fndef?: boolean;
            cbrt?: boolean;
            expm1?: boolean;
            log1p?: boolean;
            sign?: boolean;
            log2?: boolean;
        };
    }
    class Parser {
        constructor(options?: ParserOptions);
        unaryOps: any;
        functions: any;
        consts: any;
        parse(expression: string): Expression;
        evaluate(expression: string, values?: Value): number;
        static parse(expression: string): Expression;
        static evaluate(expression: string, values?: Value): number;
    }
    interface Expression {
        simplify(values?: Value): Expression;
        evaluate(values?: Value): any;
        substitute(variable: string, value: Expression | string | number): Expression;
        symbols(options?: {
            withMembers?: boolean;
        }): string[];
        variables(options?: {
            withMembers?: boolean;
        }): string[];
        toJSFunction(params: string | string[], values?: Value): (...args: any[]) => number;
    }
}
declare namespace colibri.core {
    class ContentTypeExtension extends Extension {
        static POINT_ID: string;
        private _resolvers;
        constructor(resolvers: core.IContentTypeResolver[], priority?: number);
        getResolvers(): IContentTypeResolver[];
    }
}
declare namespace colibri.core.io {
    type GetFileContent<T> = (file: FilePath, force?: boolean) => Promise<T>;
    type SetFileContent<T> = (file: FilePath, content: T) => Promise<void>;
    interface IContentCacheMap<T> {
        has(key: string): boolean;
        delete(key: string): void;
        set(key: string, value: ContentEntry<T>): void;
        get(key: string): ContentEntry<T>;
    }
    class FileContentCache<T> {
        private _backendGetContent;
        private _backendSetContent;
        private _map;
        private _preloadMap;
        constructor(getContent: GetFileContent<T>, setContent?: SetFileContent<T>);
        reset(): void;
        preload(file: FilePath, force?: boolean): Promise<ui.controls.PreloadResult>;
        getContent(file: FilePath): T;
        setContent(file: FilePath, content: T): Promise<void>;
        hasFile(file: FilePath): boolean;
    }
    class ContentEntry<T> {
        content: T;
        modTime: number;
        constructor(content: T, modTime: number);
    }
}
declare namespace colibri.core {
    class ContentTypeFileCache extends io.FileContentCache<string> {
        constructor(registry: ContentTypeRegistry);
    }
}
declare namespace colibri.core {
    class ContentTypeRegistry {
        private _resolvers;
        private _cache;
        constructor();
        resetCache(): void;
        registerResolver(resolver: IContentTypeResolver): void;
        getResolvers(): IContentTypeResolver[];
        getCachedContentType(file: io.FilePath): string;
        preloadAndGetContentType(file: io.FilePath): Promise<string>;
        preload(file: io.FilePath): Promise<ui.controls.PreloadResult>;
    }
}
declare namespace colibri.core {
    abstract class ContentTypeResolver implements IContentTypeResolver {
        private _id;
        constructor(id: string);
        getId(): string;
        abstract computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.core {
    import io = colibri.core.io;
    class ContentTypeResolverByExtension extends colibri.core.ContentTypeResolver {
        private _map;
        constructor(id: string, defs: string[][]);
        computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.core {
    const CONTENT_TYPE_ANY = "any";
    interface IContentTypeResolver {
        getId(): string;
        computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.core {
    const CONTENT_TYPE_PUBLIC_ROOT = "colibri.core.PublicRootContentType";
    class PublicRootContentTypeResolver extends ContentTypeResolver {
        static ID: string;
        constructor();
        computeContentType(file: io.FilePath): Promise<string>;
    }
}
declare namespace colibri.debug {
    function getEditorSelectedObject(): any;
    function getEditorSelection(): any[];
    function getPartSelection(): any[];
    function getPartSelectedObject(): any;
}
declare namespace colibri.core.io {
    interface IFileData {
        name: string;
        isFile: boolean;
        size: number;
        modTime: number;
        children?: IFileData[];
    }
}
declare namespace colibri.core.io {
    class FilePath {
        private _parent;
        private _name;
        private _nameWithoutExtension;
        private _isFile;
        private _files;
        private _ext;
        private _modTime;
        private _fileSize;
        private _alive;
        constructor(parent: FilePath, fileData: IFileData);
        static join(path1: string, path2: string): string;
        _sort(): void;
        _setName(name: string): void;
        getExtension(): string;
        getSize(): number;
        _setSize(size: number): void;
        getName(): string;
        getNameWithoutExtension(): string;
        getModTime(): number;
        _setModTime(modTime: number): void;
        getFullName(): string;
        getProjectRelativeName(): string;
        getUrl(): string;
        getExternalUrl(): string;
        getProject(): FilePath;
        getSibling(name: string): FilePath;
        getFile(name: string): FilePath;
        getParent(): FilePath;
        isFile(): boolean;
        isFolder(): boolean;
        isRoot(): boolean;
        getFiles(): FilePath[];
        _setAlive(alive: boolean): void;
        isAlive(): boolean;
        visit(visitor: (file: FilePath) => void): void;
        visitAsync(visitor: (file: FilePath) => Promise<void>): Promise<void>;
        _add(file: FilePath): void;
        _remove(): void;
        flatTree(files: FilePath[], includeFolders: boolean): FilePath[];
        toString(): any;
        toStringTree(): string;
        private toStringTree2;
    }
}
declare namespace colibri.core.io {
    interface IRenameData {
        oldName: string;
        newFile: FilePath;
    }
    class FileStorageChange {
        private _renameRecords_fromPath;
        private _renameRecords_toPath;
        private _renameFromToMap;
        private _deletedRecords;
        private _addedRecords;
        private _modifiedRecords;
        private _fullProjectReload;
        constructor();
        fullProjectLoaded(): void;
        isFullProjectReload(): any;
        recordRename(fromPath: string, toPath: string): void;
        getRenameTo(fromPath: string): any;
        isRenamed(fromPath: string): boolean;
        wasRenamed(toPath: string): boolean;
        getRenameToRecords(): Set<string>;
        getRenameFromRecords(): Set<string>;
        recordDelete(path: string): void;
        isDeleted(path: string): boolean;
        getDeleteRecords(): Set<string>;
        recordAdd(path: string): void;
        isAdded(path: string): boolean;
        getAddRecords(): Set<string>;
        recordModify(path: string): void;
        isModified(path: string): boolean;
        getModifiedRecords(): Set<string>;
    }
}
declare namespace colibri.core.io {
    class FileStringCache extends FileContentCache<string> {
        constructor(storage: IFileStorage);
    }
}
declare namespace colibri.core.io {
    function apiRequest(method: string, body?: any): Promise<any>;
    class FileStorage_HTTPServer implements IFileStorage {
        private _root;
        private _changeListeners;
        private _hash;
        constructor();
        private registerDocumentVisibilityListener;
        private updateWithServerChanges;
        private showMaxNumberOfFilesDialog;
        addChangeListener(listener: ChangeListenerFunc): void;
        addFirstChangeListener(listener: ChangeListenerFunc): void;
        removeChangeListener(listener: ChangeListenerFunc): void;
        getRoot(): FilePath;
        openProject(): Promise<FilePath>;
        createProject(templatePath: string, projectName: string): Promise<boolean>;
        reload(): Promise<void>;
        private fireChange;
        createFile(folder: FilePath, fileName: string, content: string): Promise<FilePath>;
        createFolder(container: FilePath, folderName: string): Promise<FilePath>;
        getFileString(file: FilePath): Promise<string>;
        setFileString(file: FilePath, content: string): Promise<void>;
        private setFileString_priv;
        deleteFiles(files: FilePath[]): Promise<void>;
        renameFile(file: FilePath, newName: string): Promise<void>;
        copyFile(fromFile: FilePath, toFolder: FilePath): Promise<FilePath>;
        moveFiles(movingFiles: FilePath[], moveTo: FilePath): Promise<void>;
        uploadFile(uploadFolder: FilePath, htmlFile: File): Promise<FilePath>;
        getImageSize(file: FilePath): Promise<ImageSize>;
    }
}
declare namespace colibri.core.io {
    type ChangeListenerFunc = (change: FileStorageChange) => any;
    type ProjectTemplatesData = {
        providers: Array<{
            name: string;
            templates: {
                name: string;
                path: string;
            };
        }>;
    };
    type ImageSize = {
        width: number;
        height: number;
    };
    interface IProjectsData {
        projects: string[];
        workspacePath?: string;
    }
    interface IFileStorage {
        reload(): Promise<void>;
        openProject(): Promise<FilePath>;
        createProject(templatePath: string, projectName: string): Promise<boolean>;
        getRoot(): FilePath;
        getFileString(file: FilePath): Promise<string>;
        setFileString(file: FilePath, content: string): Promise<void>;
        createFile(container: FilePath, fileName: string, content: string): Promise<FilePath>;
        createFolder(container: FilePath, folderName: string): Promise<FilePath>;
        deleteFiles(files: FilePath[]): Promise<void>;
        renameFile(file: FilePath, newName: string): Promise<void>;
        moveFiles(movingFiles: FilePath[], moveTo: FilePath): Promise<void>;
        copyFile(fromFile: FilePath, toFile: FilePath): Promise<FilePath>;
        uploadFile(uploadFolder: FilePath, file: File): Promise<FilePath>;
        getImageSize(file: FilePath): Promise<ImageSize>;
        addChangeListener(listener: ChangeListenerFunc): void;
        addFirstChangeListener(listener: ChangeListenerFunc): void;
        removeChangeListener(listener: ChangeListenerFunc): void;
    }
}
declare namespace colibri.core.io {
    type SyncFileContentBuilder<T> = (file: FilePath) => T;
    class SyncFileContentCache<T> {
        private _getContent;
        private _map;
        constructor(builder: SyncFileContentBuilder<T>);
        reset(): void;
        getContent(file: FilePath): T;
        hasFile(file: FilePath): boolean;
    }
}
declare namespace colibri.core.json {
    function write(data: any, name: string, value: any, defaultValue?: any): void;
    function read(data: any, name: string, defaultValue?: any): any;
    function copy(data: any): any;
    function getDataValue(data: any, key: string): any;
    function setDataValue(data: any, key: string, value: any): void;
}
declare namespace colibri.core.preferences {
    class Preferences {
        private _preferencesSpace;
        constructor(preferencesSpace: string);
        private readData;
        getPreferencesSpace(): string;
        setValue(key: string, jsonData: any): void;
        getValue(key: string, defaultValue?: any): any;
    }
}
declare namespace colibri.ui.controls {
    interface IActionConfig {
        text?: string;
        tooltip?: string;
        icon?: IImage;
        enabled?: boolean;
        showText?: boolean;
        commandId?: string;
        selected?: boolean;
        callback?(e?: MouseEvent, a?: Action): void;
    }
    class Action {
        private _text;
        private _tooltip;
        private _commandId;
        private _icon;
        private _enabled;
        private _showText;
        private _selected;
        private _callback;
        eventActionChanged: ListenerList<unknown>;
        constructor(config: IActionConfig);
        isSelected(): boolean;
        setSelected(selected: boolean): void;
        getCommandId(): string;
        getCommandKeyString(): string;
        isEnabled(): boolean;
        isShowText(): boolean;
        getText(): string;
        getTooltip(): string;
        getIcon(): IImage;
        run(e?: MouseEvent): void;
    }
}
declare namespace colibri.ui.controls {
    interface ISize {
        w: number;
        h: number;
    }
    interface IRect extends ISize {
        x: number;
        y: number;
    }
    interface IAtlasFrameData {
        frame: IRect;
        spriteSourceSize: IRect;
        sourceSize: ISize;
    }
    interface IAtlasData {
        frames: {
            [name: string]: IAtlasFrameData;
        };
    }
    /**
     * Reads an image from an atlas. The atlas is in the JSON (Hash) format.
     */
    class AtlasImage implements IImage {
        private _plugin;
        private _frame;
        constructor(plugin: Plugin, frame: string);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        private getFrameData;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    interface IBounds {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }
}
declare namespace colibri.ui.controls {
    abstract class CanvasControl extends Control {
        protected _canvas: HTMLCanvasElement;
        protected _context: CanvasRenderingContext2D;
        private _padding;
        constructor(padding?: number, ...classList: string[]);
        getCanvas(): HTMLCanvasElement;
        resizeTo(parent?: HTMLElement): void;
        getPadding(): number;
        protected ensureCanvasSize(): void;
        clear(): void;
        repaint(): void;
        private initContext;
        protected abstract paint(): void;
    }
}
declare namespace colibri.ui.controls {
    class CanvasProgressMonitor implements controls.IProgressMonitor {
        private _canvas;
        private _total;
        private _progress;
        private _ctx;
        constructor(canvas: HTMLCanvasElement);
        addTotal(total: number): void;
        step(): void;
        private render;
    }
}
declare namespace colibri.ui.controls {
    class ColorPickerManager {
        private static _currentPicker;
        private static _set;
        static createPicker(): any;
        static isActivePicker(): boolean;
        static closeActive(): void;
        private static setupPicker;
    }
}
declare namespace colibri.ui.controls {
    class Colors {
        static parseColor(htmlColor: string): {
            r: any;
            g: any;
            b: any;
            a: any;
        };
    }
}
declare namespace colibri.ui.controls {
    class DefaultImage implements IImage {
        private _ready;
        private _error;
        private _url;
        private _imageElement;
        private _requestPromise;
        constructor(img: HTMLImageElement, url: string);
        preloadSize(): Promise<PreloadResult>;
        getImageElement(): HTMLImageElement;
        getURL(): string;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        static paintImageElement(context: CanvasRenderingContext2D, image: IImageOrCanvas, x: number, y: number, w: number, h: number, center: boolean): void;
        static paintEmpty(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
        static paintImageElementFrame(context: CanvasRenderingContext2D, image: CanvasImageSource, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
    }
}
declare namespace colibri.ui.controls {
    const EMPTY_PROGRESS_MONITOR: IProgressMonitor;
}
declare namespace colibri.ui.controls {
    class FillLayout implements ILayout {
        private _padding;
        constructor(padding?: number);
        getPadding(): number;
        setPadding(padding: number): void;
        layout(parent: Control): void;
    }
}
declare namespace colibri.ui.controls {
    class FrameData {
        index: number;
        src: controls.Rect;
        dst: controls.Rect;
        srcSize: controls.Point;
        constructor(index: number, src: controls.Rect, dst: controls.Rect, srcSize: controls.Point);
        static fromRect(index: number, rect: Rect): FrameData;
    }
}
declare namespace colibri.ui.controls {
    interface IImage {
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    interface ILayout {
        layout(parent: Control): any;
    }
}
declare namespace colibri.ui.controls {
    interface IProgressMonitor {
        addTotal(total: number): any;
        step(): any;
    }
}
declare namespace colibri.ui.controls {
    class IconControl {
        private _icon;
        _context: CanvasRenderingContext2D;
        private _canvas;
        private static _themeListenerRegistered;
        constructor(icon?: IImage, isButtonStyle?: boolean);
        static getIconControlOf(element: HTMLElement): IconControl;
        repaint(): void;
        getCanvas(): HTMLCanvasElement;
        getIcon(): IImage;
        setIcon(icon: IImage, repaint?: boolean): void;
    }
}
declare namespace colibri.ui.controls {
    class IconDescriptor {
        iconPlugin: Plugin;
        iconName: string;
        constructor(iconPlugin: Plugin, iconName: string);
        getIcon(): IconImage;
    }
}
declare namespace colibri.ui.controls {
    class IconImage implements IImage {
        private _darkImage;
        private _lightImage;
        constructor(lightImage: IImage, darkImage: IImage);
        getNegativeThemeImage(): IImage;
        getLightImage(): IImage;
        getDarkImage(): IImage;
        getThemeImage(): IImage;
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    class ImageControl extends CanvasControl {
        private _image;
        constructor(padding?: number, ...classList: string[]);
        setImage(image: IImage): void;
        getImage(): IImage;
        protected paint(): Promise<void>;
        private paint2;
    }
}
declare namespace colibri.ui.controls {
    class ImageFrame implements IImage {
        private _name;
        private _image;
        private _frameData;
        constructor(name: string | number, image: controls.DefaultImage, frameData: FrameData);
        preloadSize(): Promise<PreloadResult>;
        getName(): string | number;
        getImage(): DefaultImage;
        getFrameData(): FrameData;
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
    }
}
declare namespace colibri.ui.controls {
    class ImageWrapper implements IImage {
        private _imageElement;
        constructor(imageElement: IImageOrCanvas);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        preloadSize(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        getImageElement(): IImageOrCanvas;
    }
}
declare namespace colibri.ui.controls {
    type IListener<TArg> = (arg: TArg) => any;
    const CANCEL_EVENT = "colibri.ui.controls.CANCEL_EVENT";
    class ListenerList<TArg> {
        private _listeners;
        constructor();
        addListener(listener: IListener<TArg>): void;
        removeListener(listener: IListener<TArg>): void;
        fire(listenerArgs?: TArg): boolean;
    }
}
declare namespace colibri.ui.controls {
    class Menu {
        private _text;
        private _items;
        private _element;
        private _bgElement;
        private _menuCloseCallback;
        private static _activeMenu;
        private _subMenu;
        private _parentMenu;
        private _lastItemElementSelected;
        constructor(text?: string);
        setMenuClosedCallback(callback: () => void): void;
        add(action: Action): void;
        addAction(actionConfig: IActionConfig): void;
        addMenu(subMenu: Menu): void;
        addCommand(commandId: string, config?: IActionConfig): void;
        addExtension(menuId: string): void;
        addSeparator(): void;
        isEmpty(): boolean;
        getElement(): HTMLDivElement;
        static getActiveMenu(): Menu;
        create(x: number, y: number, modal?: boolean, openLeft?: boolean): void;
        private closeSubMenu;
        createWithEvent(e: MouseEvent, openLeft?: boolean, alignToElement?: boolean): void;
        getText(): string;
        close(): void;
        closeAll(): void;
    }
}
declare namespace colibri.ui.controls {
    interface IMenuExtensionConfig {
        command?: string;
        separator?: boolean;
    }
    class MenuExtension extends Extension {
        static POINT_ID: string;
        private _menuId;
        private _configList;
        constructor(menuId: string, ...configs: IMenuExtensionConfig[]);
        getMenuId(): string;
        fillMenu(menu: controls.Menu): void;
    }
}
declare namespace colibri.ui.controls {
    class MultiImage implements IImage {
        private _width;
        private _height;
        private _images;
        constructor(images: IImage[], width: number, height: number);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        resize(width: number, height: number): void;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
declare namespace colibri.ui.controls {
    class Rect {
        x: number;
        y: number;
        w: number;
        h: number;
        constructor(x?: number, y?: number, w?: number, h?: number);
        set(x: number, y: number, w: number, h: number): void;
        contains(x: number, y: number): boolean;
        clone(): Rect;
    }
}
declare namespace colibri.ui.controls {
    class ScrollPane extends Control {
        private _clientControl;
        private _scrollBar;
        private _scrollHandler;
        private _clientContentHeight;
        constructor(clientControl: viewers.ViewerContainer);
        getViewer(): viewers.Viewer;
        updateScroll(clientContentHeight: number): void;
        private onBarMouseDown;
        private onClientWheel;
        private setClientScrollY;
        private _startDragY;
        private _startScrollY;
        private onMouseDown;
        private onMouseMove;
        private onMouseUp;
        getBounds(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        layout(forceClientLayout?: boolean): void;
    }
}
declare namespace colibri.ui.controls {
    class SplitPanel extends Control {
        private _leftControl;
        private _rightControl;
        private _horizontal;
        private _splitPosition;
        private _splitFactor;
        private _splitWidth;
        private _startDrag;
        private _startPos;
        constructor(left?: Control, right?: Control, horizontal?: boolean);
        private onDragStart;
        private onMouseDown;
        private onMouseUp;
        private onMouseMove;
        private onMouseLeave;
        setHorizontal(horizontal?: boolean): void;
        setVertical(vertical?: boolean): void;
        getSplitFactor(): number;
        private getSize;
        setSplitFactor(factor: number): void;
        setLeftControl(control: Control): void;
        getLeftControl(): Control;
        setRightControl(control: Control): void;
        getRightControl(): Control;
        layout(): void;
    }
}
declare namespace colibri.ui.controls {
    class TabPane extends Control {
        eventTabClosed: ListenerList<unknown>;
        eventTabSelected: ListenerList<unknown>;
        eventTabLabelResized: ListenerList<unknown>;
        eventTabSectionSelected: ListenerList<unknown>;
        private _titleBarElement;
        private _contentAreaElement;
        private _iconSize;
        private static _selectedTimeCounter;
        private _themeListener;
        constructor(...classList: string[]);
        private registerThemeListener;
        private findSectionElement;
        removeTabSection(label: HTMLElement, section: string): void;
        removeAllSections(label: HTMLElement, notify?: boolean): void;
        addTabSection(label: HTMLElement, section: string, tabId?: string): void;
        selectTabSection(label: HTMLElement, section: string): void;
        addTab(label: string, icon: IImage, content: Control, closeable?: boolean, selectIt?: boolean): void;
        getTabIconSize(): number;
        setTabIconSize(size: number): void;
        incrementTabIconSize(amount: number): void;
        private makeLabel;
        private showTabLabelMenu;
        protected fillTabMenu(menu: Menu, labelElement: HTMLElement): void;
        setTabCloseIcons(labelElement: HTMLElement, icon: IImage, overIcon: IImage): void;
        closeTab(content: controls.Control): void;
        closeAll(): void;
        protected closeTabLabel(labelElement: HTMLElement): void;
        setTabTitle(content: Control, title: string, icon?: IImage): void;
        static isTabCloseIcon(element: HTMLElement): boolean;
        static isTabLabel(element: HTMLElement): boolean;
        getLabelFromContent(content: Control): HTMLElement;
        private static getContentAreaFromLabel;
        static getContentFromLabel(labelElement: HTMLElement): Control;
        selectTabWithContent(content: Control): void;
        protected selectTab(toSelectLabel: HTMLElement): void;
        getSelectedTabContent(): Control;
        isSelectedLabel(labelElement: HTMLElement): boolean;
        getContentList(): controls.Control[];
        private getSelectedLabelElement;
    }
}
declare namespace colibri.ui.controls {
    interface ITheme {
        id: string;
        classList: string[];
        displayName: string;
        viewerSelectionBackground: string;
        viewerSelectionForeground: string;
        viewerForeground: string;
        dark: boolean;
    }
}
declare namespace colibri.ui.controls {
    class ToolbarManager {
        private _toolbarElement;
        private _actionDataMap;
        constructor(toolbarElement: HTMLElement);
        static isToolbarItem(element: HTMLElement): boolean;
        static findToolbarItem(element: HTMLElement): any;
        addCommand(commandId: string, config?: IActionConfig): void;
        addAction(config: IActionConfig): Action;
        add(action: Action): void;
        dispose(): void;
        private updateButtonWithAction;
    }
}
declare namespace colibri.ui.controls {
    class Tooltip {
        static tooltip(element: HTMLElement, tooltip: string): void;
        static tooltipWithKey(element: HTMLElement, keyString: any, tooltip: string): void;
        private static renderTooltip;
    }
}
declare namespace colibri.ui.controls {
    class ZoomControl {
        private _element;
        private _callback;
        constructor(args: {
            showReset: boolean;
        });
        setCallback(callback: (zoom: number) => void): void;
        getElement(): HTMLDivElement;
    }
}
declare namespace colibri.ui.controls {
    const CONTROL_PADDING = 3;
    const ROW_HEIGHT = 20;
    const FONT_OFFSET = 2;
    const FONT_FAMILY = "Arial, Helvetica, sans-serif";
    const ACTION_WIDTH = 20;
    const PANEL_BORDER_SIZE = 5;
    const PANEL_TITLE_HEIGHT = 22;
    const FILTERED_VIEWER_FILTER_HEIGHT = 30;
    const SPLIT_OVER_ZONE_WIDTH = 6;
    function getCanvasFontHeight(): number;
    function incrementFontHeight(delta: number): void;
    function resetFontHeight(): void;
    function setElementBounds(elem: HTMLElement, bounds: IBounds): void;
    function getElementBounds(elem: HTMLElement): IBounds;
}
declare namespace colibri.ui.controls.dialogs {
    class Dialog extends Control {
        eventDialogClose: ListenerList<unknown>;
        private _containerElement;
        private _buttonPaneElement;
        private _titlePaneElement;
        private _width;
        private _height;
        private static _dialogs;
        private static _firstTime;
        private _parentDialog;
        private _closeWithEscapeKey;
        constructor(...classList: string[]);
        processKeyCommands(): boolean;
        static closeAllDialogs(): void;
        static getActiveDialog(): Dialog;
        getDialogBackgroundElement(): HTMLElement;
        setCloseWithEscapeKey(closeWithEscapeKey: boolean): void;
        isCloseWithEscapeKey(): boolean;
        getParentDialog(): Dialog;
        create(hideParentDialog?: boolean): void;
        setTitle(title: string): void;
        addCancelButton(callback?: () => void): HTMLButtonElement;
        addButton(text: string, callback: (e?: MouseEvent) => void): HTMLButtonElement;
        addElementToButtonPanel(element: HTMLElement): void;
        connectInputWithButton(inputElement: HTMLInputElement, btnElement: HTMLButtonElement): void;
        protected createDialogArea(): void;
        protected resize(): void;
        setSize(width: number, height: number, keep1080pRatio?: boolean): void;
        getSize(): {
            width: number;
            height: number;
        };
        close(): void;
        isClosed(): boolean;
        protected goFront(): void;
        closeAll(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    abstract class AbstractViewerDialog extends Dialog {
        private _viewer;
        private _filteredViewer;
        protected _showZoomControls: boolean;
        constructor(viewer: viewers.TreeViewer, showZoomControls: boolean);
        protected createFilteredViewer(): void;
        protected newFilteredViewer(): viewers.FilteredViewer<viewers.TreeViewer>;
        getViewer(): viewers.TreeViewer;
        getFilteredViewer(): viewers.FilteredViewer<viewers.TreeViewer>;
        goFront(): void;
        enableButtonOnlyWhenOneElementIsSelected(btn: HTMLButtonElement, filter?: (obj: any) => boolean): HTMLButtonElement;
        addOpenButton(text: string, callback: (selection: any[]) => void, allowSelectEmpty?: boolean): HTMLButtonElement;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class AlertDialog extends Dialog {
        private _messageElement;
        private static _currentDialog;
        constructor();
        createDialogArea(): void;
        create(): void;
        close(): void;
        setMessage(text: string): void;
        static replaceConsoleAlert(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ViewerDialog extends AbstractViewerDialog {
        constructor(viewer: viewers.TreeViewer, showZoomControls: boolean);
        createDialogArea(): void;
        protected fillContextMenu(menu: controls.Menu): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class CommandDialog extends controls.dialogs.ViewerDialog {
        constructor();
        create(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class CommentDialog extends Dialog {
        constructor();
        createDialogArea(): void;
        protected resize(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ConfirmDialog extends Dialog {
        private _messageElement;
        private _confirmBtn;
        private _confirmCallback;
        constructor();
        createDialogArea(): void;
        create(): void;
        getConfirmButton(): HTMLButtonElement;
        setConfirmCallback(callback: (ok: boolean) => void): void;
        setMessage(text: string): void;
        static show(message: string, confirmBtnText?: string): Promise<boolean>;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class FormDialog extends Dialog {
        private _formElement;
        private _formBuilder;
        constructor();
        protected createDialogArea(): void;
        layout(): void;
        getBuilder(): properties.EasyFormBuilder;
        getFormElement(): HTMLDivElement;
    }
}
declare namespace colibri.ui.controls.dialogs {
    type InputValidator = (input: string) => boolean;
    type ResultCallback = (value: string) => void;
    class InputDialog extends Dialog {
        private _textElement;
        private _messageElement;
        private _acceptButton;
        private _validator;
        private _resultCallback;
        constructor();
        getAcceptButton(): HTMLButtonElement;
        setInputValidator(validator: InputValidator): void;
        setResultCallback(callback: ResultCallback): void;
        setMessage(message: string): void;
        setInitialValue(value: string): void;
        createDialogArea(): void;
        validate(): void;
        create(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ProgressDialog extends Dialog {
        private _progressElement;
        constructor();
        createDialogArea(): void;
        create(): void;
        setProgress(progress: number): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ProgressDialogMonitor implements IProgressMonitor {
        private _dialog;
        private _total;
        private _step;
        constructor(dialog: ProgressDialog);
        private updateDialog;
        addTotal(total: number): void;
        step(): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    abstract class LabelCellRenderer implements ICellRenderer {
        renderCell(args: RenderCellArgs): void;
        abstract getImage(obj: any): controls.IImage;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class ImageCellRenderer implements ICellRenderer {
        private _singleImage;
        constructor(singleImage?: IImage);
        getImage(obj: any): IImage;
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    abstract class Viewer extends Control {
        eventOpenItem: ListenerList<unknown>;
        eventDeletePressed: ListenerList<unknown>;
        private _contentProvider;
        private _cellRendererProvider;
        private _labelProvider;
        private _styledLabelProvider;
        private _input;
        private _cellSize;
        protected _expandedObjects: Set<any>;
        private _selectedObjects;
        protected _context: CanvasRenderingContext2D;
        protected _paintItems: PaintItem[];
        private _lastSelectedItemIndex;
        protected _contentHeight: number;
        private _filterText;
        protected _filterIncludeSet: Set<any>;
        protected _filterMatches: Map<string, IMatchResult>;
        private _highlightMatches;
        private _viewerId;
        private _preloadEnabled;
        private _filterOnRepaintEnabled;
        private _searchEngine;
        constructor(id: string, ...classList: string[]);
        isHighlightMatches(): boolean;
        setHighlightMatches(highlightMatches: boolean): void;
        getSearchEngine(): ISearchEngine;
        setSearchEngine(engine: ISearchEngine): void;
        getViewerId(): string;
        restoreCellSize(): void;
        saveCellSize(): void;
        private initListeners;
        private onKeyDown;
        private moveCursor;
        private onDragStart;
        getLabelProvider(): ILabelProvider;
        setLabelProvider(labelProvider: ILabelProvider): void;
        getStyledLabelProvider(): IStyledLabelProvider;
        setStyledLabelProvider(styledLabelProvider: IStyledLabelProvider): void;
        setFilterText(filterText: string): void;
        getFilterText(): string;
        protected prepareFiltering(updateScroll: boolean): void;
        isFilterIncluded(obj: any): boolean;
        protected abstract buildFilterIncludeMap(): any;
        protected matches(obj: any): boolean;
        getMatchesResult(label: string): IMatchResult;
        protected getPaintItemAt(e: MouseEvent): PaintItem;
        getSelection(): any[];
        getSelectionFirstElement(): any;
        setSelection(selection: any[], notify?: boolean): void;
        abstract reveal(...objects: any[]): Promise<void>;
        abstract revealAndSelect(...objects: any[]): Promise<void>;
        private fireSelectionChanged;
        escape(): void;
        private onWheel;
        private onDoubleClick;
        protected abstract canSelectAtPoint(e: MouseEvent): boolean;
        onMouseUp(e: MouseEvent): void;
        private initContext;
        setExpanded(obj: any, expanded: boolean): void;
        isExpanded(obj: any): boolean;
        getExpandedObjects(): Set<any>;
        isCollapsed(obj: any): boolean;
        collapseAll(): void;
        isSelected(obj: any): boolean;
        setFilterOnRepaintDisabled(): void;
        setPreloadDisabled(): void;
        protected paintTreeHandler(x: number, y: number, collapsed: boolean): void;
        repaint(fullRepaint?: boolean): Promise<void>;
        private updateScrollPane;
        protected repaintNow(fullRepaint: boolean): void;
        private preload;
        paintItemBackground(obj: any, x: number, y: number, w: number, h: number, radius?: number): void;
        setScrollY(scrollY: number): void;
        layout(): void;
        protected abstract paint(fullPaint: boolean): void;
        getCanvas(): HTMLCanvasElement;
        getContext(): CanvasRenderingContext2D;
        getCellSize(): number;
        setCellSize(cellSize: number, restoreSavedSize?: boolean): void;
        getContentProvider(): IContentProvider;
        setContentProvider(contentProvider: IContentProvider): void;
        getCellRendererProvider(): ICellRendererProvider;
        setCellRendererProvider(cellRendererProvider: ICellRendererProvider): void;
        getInput(): any;
        setInput(input: any): void;
        selectFirst(): void;
        getState(): ViewerState;
        setState(state: ViewerState): void;
        selectAll(): void;
    }
    type ViewerState = {
        expandedObjects: Set<any>;
        selectedObjects: Set<any>;
        filterText: string;
        cellSize: number;
    };
}
declare namespace colibri.ui.controls.viewers {
    class EmptyTreeContentProvider implements ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    const TREE_ICON_SIZE = 16;
    const LABEL_MARGIN: number;
    type TreeIconInfo = {
        rect: Rect;
        obj: any;
    };
    class TreeViewer extends Viewer {
        private _treeRenderer;
        private _treeIconList;
        constructor(id: string, ...classList: string[]);
        expandRoots(repaint?: boolean): void;
        setExpandWhenOpenParentItem(): void;
        expandCollapseBranch(): Promise<void>;
        getTreeRenderer(): TreeViewerRenderer;
        setTreeRenderer(treeRenderer: TreeViewerRenderer): void;
        canSelectAtPoint(e: MouseEvent): boolean;
        revealAndSelect(...objects: any[]): Promise<void>;
        reveal(...objects: any[]): Promise<void>;
        private revealPath;
        findElementByLabel(label: string): any;
        private findElementByLabel_inList;
        private findElementByLabel_inElement;
        getObjectPath(obj: any): any[];
        private getObjectPath2;
        private getTreeIconAtPoint;
        private onClick;
        visitObjects(visitor: (obj: any) => void): void;
        private visitObjects2;
        protected paint(fullPaint: boolean): void;
        getFirstVisibleElement(): any;
        getVisibleElements(): any[];
        setFilterText(filter: string): void;
        private _filterTime;
        private _token;
        private _delayOnManyChars;
        private _delayOnFewChars;
        private _howMuchIsFewChars;
        setFilterDelay(delayOnManyChars: number, delayOnFewChars: number, howMuchIsFewChars: number): void;
        private maybeFilter;
        private filterNow;
        private expandFilteredParents;
        protected buildFilterIncludeMap(): void;
        private buildFilterIncludeMap2;
        getContentProvider(): ITreeContentProvider;
    }
}
declare namespace colibri.ui.controls.viewers {
    class LabelProvider implements ILabelProvider {
        private _getLabel;
        constructor(getLabel?: (obj: any) => string);
        getLabel(obj: any): string;
    }
}
declare namespace colibri.ui.controls.dialogs {
    import controls = colibri.ui.controls;
    class ThemesDialog extends controls.dialogs.ViewerDialog {
        constructor();
        create(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class ViewerFormDialog extends AbstractViewerDialog {
        constructor(viewer: viewers.TreeViewer, showZoomControls: boolean);
        protected createDialogArea(): void;
        newFilteredViewer(): viewers.FilteredViewerInElement<viewers.TreeViewer>;
        getFilteredViewer(): viewers.FilteredViewerInElement<viewers.TreeViewer>;
        layout(): void;
        protected createFormArea(formArea: HTMLDivElement): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class WizardDialog extends Dialog {
        private _pageDescArea;
        private _pageArea;
        private _clientArea;
        private _pageTitleLabel;
        private _pages;
        private _activePageIndex;
        private _finishButton;
        private _cancelButton;
        private _nextButton;
        private _backButton;
        constructor(...classList: string[]);
        addPages(...pages: WizardPage[]): void;
        private createActivePage;
        updateWizardButtons(): void;
        protected canFinishWizard(): boolean;
        hasPages(): boolean;
        getPages(): WizardPage[];
        getActivePageIndex(): number;
        getActivePage(): WizardPage;
        create(): void;
        createDialogArea(): void;
        protected cancelButtonPressed(): void;
        protected finishButtonPressed(): void;
    }
}
declare namespace colibri.ui.controls.dialogs {
    class WizardPage {
        private _title;
        private _description;
        private _wizard;
        constructor(title: string, description: string);
        getWizard(): WizardDialog;
        setWizard(wizard: WizardDialog): void;
        getDescription(): string;
        setDescription(description: string): void;
        getTitle(): string;
        setTitle(title: string): void;
        createElements(parent: HTMLElement): void;
        canFinish(): boolean;
        canGoNext(): boolean;
        canGoBack(): boolean;
        saveState(): void;
    }
}
declare namespace colibri.ui.controls.properties {
    class EasyFormBuilder {
        private _formBuilder;
        private _parent;
        constructor(parent: HTMLElement);
        createLabel(text?: string, tooltip?: string): HTMLLabelElement;
        createButton(text: string, callback: (e?: MouseEvent) => void): HTMLButtonElement;
        createMenuButton(text: string, getItems: () => Array<{
            name: string;
            value: any;
            icon?: controls.IImage;
        }>, callback: (value: any) => void): HTMLButtonElement;
        createText(readOnly?: boolean): HTMLInputElement;
        createTextDialog(dialogTitle: string, readOnly?: boolean): {
            container: HTMLDivElement;
            text: HTMLTextAreaElement;
            btn: HTMLButtonElement;
        };
        createColor(readOnly?: boolean, allowAlpha?: boolean): {
            element: HTMLDivElement;
            text: HTMLInputElement;
            btn: HTMLButtonElement;
        };
        createTextArea(readOnly?: boolean): HTMLTextAreaElement;
    }
}
declare namespace colibri.ui.controls.properties {
    interface ICreateButtonDialogArgs {
        getValue: () => any;
        onValueSelected: (value: string) => void;
        updateIconCallback?: (iconControl: IconControl, value: any) => Promise<void>;
        createDialogViewer: (revealValue: string) => Promise<controls.viewers.TreeViewer>;
        dialogElementToString: (viewer: colibri.ui.controls.viewers.TreeViewer, value: any) => string;
        dialogTittle: string;
    }
    class FormBuilder {
        createSeparator(parent: HTMLElement, text: string): HTMLLabelElement;
        createLabel(parent: HTMLElement, text?: string, tooltip?: string): HTMLLabelElement;
        createButton(parent: HTMLElement, text: string, callback: (e?: MouseEvent) => void): HTMLButtonElement;
        createMenuButton(parent: HTMLElement, text: string, getItems: () => Array<{
            name: string;
            value: any;
            icon?: controls.IImage;
        }>, callback: (value: any) => void): HTMLButtonElement;
        createText(parent: HTMLElement, readOnly?: boolean): HTMLInputElement;
        createButtonDialog(args: ICreateButtonDialogArgs): {
            buttonElement: HTMLButtonElement;
            updateDialogButtonIcon: () => void;
        };
        createTextDialog(parent: HTMLElement, dialogTitle: string, readOnly?: boolean): {
            container: HTMLDivElement;
            text: HTMLTextAreaElement;
            btn: HTMLButtonElement;
        };
        createColor(parent?: HTMLElement, readOnly?: boolean, allowAlpha?: boolean): {
            element: HTMLDivElement;
            text: HTMLInputElement;
            btn: HTMLButtonElement;
        };
        createTextArea(parent: HTMLElement, readOnly?: boolean): HTMLTextAreaElement;
        private static NEXT_ID;
        createCheckbox(parent: HTMLElement, label?: HTMLLabelElement): HTMLInputElement;
        createMenuIcon(parent: HTMLElement, menuProvider: () => Menu): IconControl;
        createIcon(parent: HTMLElement, iconImage: IImage): IconControl;
    }
}
declare namespace colibri.ui.controls.properties {
    class PropertyPage extends Control {
        private _sectionProvider;
        private _sectionPanes;
        private _sectionPaneMap;
        private _selection;
        constructor();
        getSections(): PropertySection<any>[];
        getSection(sectionId: string): PropertySection<any>;
        private build;
        private removePanesWithSameTypeHash;
        updateWithSelection(): void;
        updateExpandStatus(): void;
        getSelection(): any[];
        setSelection(sel: any[], update?: boolean): any;
        setSectionProvider(provider: PropertySectionProvider): void;
        getSectionProvider(): PropertySectionProvider;
    }
}
declare namespace colibri.ui.controls.properties {
    type Updater = () => void;
    abstract class PropertySection<T> extends FormBuilder {
        private _id;
        private _title;
        private _page;
        private _updaters;
        private _fillSpace;
        private _collapsedByDefault;
        private _icon;
        private _typeHash;
        constructor(page: PropertyPage, id: string, title: string, fillSpace?: boolean, collapsedByDefault?: boolean, icon?: controls.IImage, typeHash?: string);
        abstract createForm(parent: HTMLDivElement): void;
        abstract canEdit(obj: any, n: number): boolean;
        canEditAll(selection: any[]): boolean;
        private localStorageKey;
        abstract canEditNumber(n: number): boolean;
        createMenu(menu: controls.Menu): void;
        hasMenu(): boolean;
        updateWithSelection(): void;
        addUpdater(updater: Updater): void;
        isFillSpace(): boolean;
        isCollapsedByDefault(): boolean;
        getPage(): PropertyPage;
        getSelection(): T[];
        getSelectionFirstElement(): T;
        getId(): string;
        getTitle(): string;
        isDynamicTitle(): boolean;
        getIcon(): IImage;
        getTypeHash(): string;
        create(parent: HTMLDivElement): void;
        flatValues_Number(values: number[]): string;
        flatValues_StringJoin(values: string[]): string;
        flatValues_StringJoinDifferent(values: string[]): string;
        flatValues_StringOneOrNothing(values: string[]): string;
        flatValues_BooleanAnd(values: boolean[]): boolean;
        parseNumberExpression(textElement: HTMLInputElement, isInteger?: boolean): number;
        createGridElement(parent: HTMLElement, cols?: number, simpleProps?: boolean): HTMLDivElement;
    }
}
declare namespace colibri.ui.controls.properties {
    class PropertySectionPane extends Control {
        private _section;
        private _titleArea;
        private _formArea;
        private _page;
        private _menuIcon;
        private _expandIconControl;
        private _titleLabel;
        constructor(page: PropertyPage, section: PropertySection<any>);
        createSection(): void;
        private getCollapsedStateInStorage;
        private setCollapsedStateInStorage;
        private getLocalStorageKey;
        isExpanded(): boolean;
        private toggleSection;
        updateTitle(): void;
        private updateExpandIcon;
        getSection(): PropertySection<any>;
    }
}
declare namespace colibri.ui.controls.properties {
    abstract class PropertySectionProvider {
        private _id;
        constructor(id?: string);
        abstract addSections(page: PropertyPage, sections: Array<PropertySection<any>>): void;
        getEmptySelectionObject(): any;
        getEmptySelectionArray(): any;
    }
}
declare namespace colibri.ui.controls.properties {
    class StringDialog extends dialogs.Dialog {
        private _textArea;
        createDialogArea(): void;
        setValue(value: string): void;
        getValue(): string;
    }
}
declare namespace colibri.ui.controls.viewers {
    const EMPTY_ARRAY: any[];
    class ArrayTreeContentProvider implements ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    class DefaultViewerMenuProvider implements IViewerMenuProvider {
        private builder?;
        constructor(builder?: (viewer: TreeViewer, menu: Menu) => void);
        fillMenu(viewer: TreeViewer, menu: Menu): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    class EmptyCellRenderer implements ICellRenderer {
        static readonly instance: EmptyCellRenderer;
        private _variableSize;
        constructor(variableSize?: boolean);
        isVariableSize(): boolean;
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class EmptyCellRendererProvider implements ICellRendererProvider {
        private _getRenderer;
        static withIcon(icon: IImage): EmptyCellRendererProvider;
        constructor(getRenderer?: (element: any) => ICellRenderer);
        getCellRenderer(element: any): ICellRenderer;
        preload(obj: any): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class FilterControl extends Control {
        private _filterElement;
        private _menuIcon;
        private _filteredViewer;
        private _inputIcon;
        constructor(filterViewer: FilteredViewer<any>);
        private clearFilter;
        private updateInputIcon;
        getFilteredViewer(): FilteredViewer<any>;
        getFilterElement(): HTMLInputElement;
        getMenuIcon(): IconControl;
    }
    class ViewerContainer extends controls.Control {
        private _viewer;
        private _zoomControl;
        private _filteredViewer;
        constructor(filteredViewer: FilteredViewer<any>, zoom?: boolean);
        private addZoomControl;
        getViewer(): Viewer;
        layout(): void;
    }
    class FilteredViewer<T extends TreeViewer> extends Control {
        private _viewer;
        private _viewerContainer;
        private _filterControl;
        private _scrollPane;
        private _menuProvider;
        constructor(viewer: T, showZoomControls: boolean, ...classList: string[]);
        protected registerContextMenu(): void;
        getMenuProvider(): IViewerMenuProvider;
        setMenuProvider(menuProvider: IViewerMenuProvider): void;
        getScrollPane(): ScrollPane;
        private registerListeners;
        clearFilter(): void;
        private onFilterInput;
        filterText(value: string): void;
        getViewer(): T;
        layout(): void;
        getFilterControl(): FilterControl;
    }
}
declare namespace colibri.ui.controls.viewers {
    class FilteredViewerInElement<T extends TreeViewer> extends FilteredViewer<T> {
        constructor(viewer: T, showZoomControls: boolean, ...classList: string[]);
        resizeTo(): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    class FolderCellRenderer implements ICellRenderer {
        private _maxCount;
        constructor(maxCount?: number);
        renderCell(args: RenderCellArgs): void;
        private renderFolder;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
        protected renderGrid(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
    }
}
declare namespace colibri.ui.controls.viewers {
    class TreeViewerRenderer {
        private _viewer;
        protected _contentHeight: number;
        protected _fullPaint: boolean;
        protected _itemIndex: number;
        constructor(viewer: TreeViewer, cellSize?: number);
        getViewer(): TreeViewer;
        paint(fullPaint: boolean): {
            contentHeight: number;
            paintItems: PaintItem[];
            treeIconList: TreeIconInfo[];
        };
        protected paintItems(objects: any[], treeIconList: TreeIconInfo[], paintItems: PaintItem[], parentPaintItem: PaintItem, x: number, y: number): {
            x: number;
            y: number;
        };
        private renderTreeCell;
        protected renderMatchHighlight(args: RenderCellArgs, x: number, y: number, label: string): void;
        private defaultRenderMatchHighlight;
        protected renderLabel(args: RenderCellArgs, x: number, y: number): void;
        protected renderPlainLabel(args: RenderCellArgs, x: number, y: number): void;
        protected renderStyledLabel(args: RenderCellArgs, x: number, y: number, styledProvider: IStyledLabelProvider, maxLength?: number): void;
        protected measureText(args: RenderCellArgs, text: string): number;
        protected prepareContextForRenderCell(args: RenderCellArgs): void;
        protected prepareContextForText(args: RenderCellArgs): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    const TREE_RENDERER_GRID_PADDING = 5;
    class GridTreeViewerRenderer extends TreeViewerRenderer {
        private _center;
        private _flat;
        private _isSectionCriteria;
        private _isShadowChildCriteria;
        private _paintItemShadow;
        constructor(viewer: TreeViewer, flat?: boolean, center?: boolean);
        static expandSections(viewer: TreeViewer): void;
        setPaintItemShadow(paintShadow: boolean): this;
        isPaintItemShadow(): boolean;
        setSectionCriteria(sectionCriteria: (obj: any) => boolean): this;
        getSectionCriteria(): (obj: any) => boolean;
        setShadowChildCriteria(shadowChildCriteria: (any: any) => boolean): this;
        getShadowChildCriteria(): (obj: any) => boolean;
        isSection(obj: any): boolean;
        isFlat(): boolean;
        paint(fullPaint: boolean): {
            contentHeight: number;
            paintItems: PaintItem[];
            treeIconList: TreeIconInfo[];
        };
        protected paintItems(objects: any[], treeIconList: TreeIconInfo[], paintItems: PaintItem[], parentPaintItem: PaintItem, x: number, y: number): {
            x: number;
            y: number;
        };
        private paintGrid;
        private paintIcon;
        private renderGridCell;
        private trimLabel;
        protected renderCellBack(args: RenderCellArgs, selected: boolean, isLastChild: boolean): void;
        protected renderCellFront(args: RenderCellArgs, selected: boolean, isLastChild: boolean): void;
        private drawPanelBottom;
        private drawPanelTop;
        drawPanelRow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
        private drawPanelCollapsed;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ICellRenderer {
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
        layout?: "square" | "full-width";
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ICellRendererProvider {
        getCellRenderer(element: any): ICellRenderer;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface IContentProvider {
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ILabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface IMatchResult {
        start?: number;
        end?: number;
        measureStart?: string;
        measureMatch?: string;
        matches: boolean;
    }
    interface ISearchEngine {
        prepare(pattern: string): void;
        matches(text: string): IMatchResult;
    }
}
declare namespace colibri.ui.controls.viewers {
    interface IStyledText {
        text: string;
        color: string;
    }
    interface IStyledLabelProvider {
        getStyledTexts(obj: any, dark: boolean): IStyledText[];
    }
}
declare namespace colibri.ui.controls.viewers {
    interface ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace colibri.ui.controls.viewers {
    interface IViewerMenuProvider {
        fillMenu(viewer: TreeViewer, menu: Menu): void;
    }
}
declare namespace colibri.ui.controls.viewers {
    class IconImageCellRenderer implements ICellRenderer {
        private _icon;
        constructor(icon: IImage);
        getIcon(obj: any): IImage;
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class IconGridCellRenderer implements ICellRenderer {
        private _icon;
        constructor(icon: IImage);
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<any>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class ImageFromCellRenderer implements IImage {
        private _renderer;
        private _obj;
        private _width;
        private _height;
        private _dummyViewer;
        constructor(obj: any, renderer: ICellRenderer, width: number, height: number);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, scrW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        preload(): Promise<PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class LabelProviderFromStyledLabelProvider implements ILabelProvider {
        private _styledLabelProvider;
        constructor(styledLabelProvider: IStyledLabelProvider);
        getLabel(obj: any): string;
    }
}
declare namespace colibri.ui.controls.viewers {
    class MultiWordSearchEngine implements ISearchEngine {
        private _words;
        prepare(pattern: string): void;
        matches(text: string): IMatchResult;
    }
}
declare namespace colibri.ui.controls.viewers {
    class OneCharCellRenderer implements ICellRenderer {
        private _iconSize;
        constructor(iconSize: boolean);
        renderCell(args: RenderCellArgs): void;
        cellHeight(args: RenderCellArgs): number;
        preload(args: PreloadCellArgs): Promise<PreloadResult>;
    }
}
declare namespace colibri.ui.controls.viewers {
    class PaintItem extends controls.Rect {
        index: number;
        data: any;
        parent: PaintItem;
        visible: boolean;
        constructor(index: number, data: any, parent: PaintItem, visible: boolean);
    }
}
declare namespace colibri.ui.controls.viewers {
    class PreloadCellArgs {
        obj: any;
        viewer: Viewer;
        constructor(obj: any, viewer: Viewer);
        clone(): PreloadCellArgs;
    }
}
declare namespace colibri.ui.controls.viewers {
    class RenderCellArgs {
        canvasContext: CanvasRenderingContext2D;
        x: number;
        y: number;
        w: number;
        h: number;
        obj: any;
        viewer: Viewer;
        center: boolean;
        constructor(canvasContext: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, obj: any, viewer: Viewer, center?: boolean);
        clone(): RenderCellArgs;
    }
}
declare namespace colibri.ui.controls.viewers {
    class SingleWordSearchEngine implements ISearchEngine {
        private _pattern;
        prepare(pattern: string): void;
        matches(text: string): IMatchResult;
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorFactory {
        abstract acceptInput(input: any): boolean;
        abstract createEditor(): EditorPart;
        abstract getName(): any;
    }
}
declare namespace colibri.ui.ide {
    class ContentTypeEditorFactory extends EditorFactory {
        private _name;
        private _contentType;
        private _newEditor?;
        constructor(name: string, contentType: string, newEditor: (factory?: ContentTypeEditorFactory) => EditorPart);
        getName(): string;
        acceptInput(input: any): boolean;
        createEditor(): EditorPart;
    }
}
declare namespace colibri.ui.ide {
    type ContentTypeIconExtensionConfig = Array<{
        iconDescriptor: controls.IconDescriptor;
        contentType: string;
    }>;
    class ContentTypeIconExtension extends Extension {
        static POINT_ID: string;
        private _config;
        static withPluginIcons(plugin: colibri.Plugin, config: Array<{
            plugin?: Plugin;
            iconName: string;
            contentType: string;
        }>): ContentTypeIconExtension;
        constructor(config: ContentTypeIconExtensionConfig);
        getConfig(): ContentTypeIconExtensionConfig;
    }
}
declare namespace colibri.ui.ide {
    abstract class Part extends controls.Control {
        eventPartTitleChanged: controls.ListenerList<unknown>;
        private _id;
        private _title;
        private _selection;
        private _partCreated;
        private _icon;
        private _folder;
        private _undoManager;
        private _restoreState;
        constructor(id: string);
        setRestoreState(state: any): void;
        getUndoManager(): undo.UndoManager;
        getPartFolder(): PartFolder;
        setPartFolder(folder: PartFolder): void;
        getTitle(): string;
        setTitle(title: string): void;
        setIcon(icon: controls.IImage): void;
        dispatchTitleUpdatedEvent(): void;
        getIcon(): controls.IImage;
        getId(): string;
        setSelection(selection: any[], notify?: boolean): void;
        getSelection(): any[];
        dispatchSelectionChanged(): void;
        getPropertyProvider(): controls.properties.PropertySectionProvider;
        layout(): void;
        onPartAdded(): void;
        onPartClosed(): boolean;
        onPartShown(): void;
        protected doCreatePart(): void;
        onPartActivated(): void;
        onPartDeactivated(): void;
        saveState(state: any): void;
        protected restoreState(state: any): void;
        protected abstract createPart(): void;
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorPart extends Part {
        eventDirtyStateChanged: controls.ListenerList<boolean>;
        private _input;
        private _dirty;
        private _embeddedMode;
        private _editorFactory;
        constructor(id: string, factory: EditorFactory);
        getEditorFactory(): EditorFactory;
        isEmbeddedMode(): boolean;
        isInEditorArea(): boolean;
        setEmbeddedMode(embeddedMode: boolean): void;
        setDirty(dirty: boolean): void;
        isDirty(): boolean;
        save(): Promise<void>;
        protected doSave(): Promise<void>;
        onPartClosed(): boolean;
        onPartAdded(): void;
        getInput(): IEditorInput;
        setInput(input: IEditorInput): void;
        getEditorViewerProvider(key: string): EditorViewerProvider;
        createEditorToolbar(parent: HTMLElement): controls.ToolbarManager;
        getEmbeddedEditorState(): any;
        restoreEmbeddedEditorState(state: any): void;
    }
}
declare namespace colibri.ui.ide {
    class PartFolder extends controls.TabPane {
        constructor(...classList: string[]);
        addPart(part: Part, closeable?: boolean, selectIt?: boolean): void;
        getParts(): Part[];
    }
}
declare namespace colibri.ui.ide {
    class EditorArea extends PartFolder {
        private _tabsToBeClosed;
        constructor();
        activateEditor(editor: EditorPart): void;
        getEditors(): EditorPart[];
        getSelectedEditor(): EditorPart;
        fillTabMenu(menu: controls.Menu, labelElement: HTMLElement): void;
        closeAllEditors(): void;
        closeEditors(editors: EditorPart[]): void;
        selectTab(label: HTMLElement): void;
    }
}
declare namespace colibri.ui.ide {
    class EditorExtension extends Extension {
        static POINT_ID: string;
        private _factories;
        constructor(factories: EditorFactory[]);
        getFactories(): EditorFactory[];
    }
}
declare namespace colibri.ui.ide {
    abstract class EditorInputExtension extends Extension {
        static POINT_ID: string;
        private _id;
        constructor(id: string);
        getId(): string;
        abstract createEditorInput(state: any): IEditorInput;
        abstract getEditorInputState(input: IEditorInput): any;
        abstract getEditorInputId(input: IEditorInput): string;
    }
}
declare namespace colibri.ui.ide {
    class EditorRegistry {
        private _factories;
        private _defaultFactory;
        constructor();
        registerDefaultFactory(defaultFactory: EditorFactory): void;
        registerFactory(factory: EditorFactory): void;
        getFactoryForInput(input: any): EditorFactory;
        getFactories(): EditorFactory[];
        getFactoryByName(name: string): EditorFactory;
        getDefaultFactory(): EditorFactory;
    }
}
declare namespace colibri.ui.ide {
    import viewers = controls.viewers;
    abstract class EditorViewerProvider {
        private _viewer;
        private _initialSelection;
        private _selectedTabSection;
        constructor();
        setViewer(viewer: controls.viewers.TreeViewer): void;
        setSelection(selection: any[], reveal: boolean, notify: boolean): void;
        getSelection(): any[];
        onViewerSelectionChanged(selection: any[]): void;
        repaint(resetScroll?: boolean): void;
        prepareViewerState(state: viewers.ViewerState): void;
        abstract getContentProvider(): viewers.ITreeContentProvider;
        abstract getLabelProvider(): viewers.ILabelProvider;
        getStyledLabelProvider(): viewers.IStyledLabelProvider;
        abstract getCellRendererProvider(): viewers.ICellRendererProvider;
        abstract getTreeViewerRenderer(viewer: controls.viewers.TreeViewer): viewers.TreeViewerRenderer;
        abstract getPropertySectionProvider(): controls.properties.PropertySectionProvider;
        abstract getInput(): any;
        abstract preload(complete?: boolean): Promise<void>;
        abstract getUndoManager(): any;
        getTabSections(): any[];
        tabSectionChanged(section: string): void;
        getSelectedTabSection(): string;
        allowsTabSections(): boolean;
        fillContextMenu(menu: controls.Menu): void;
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewPart extends Part {
        constructor(id: string);
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewerView extends ViewPart {
        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        private _showZoomControls;
        constructor(id: string, showZoomControls?: boolean);
        protected abstract createViewer(): controls.viewers.TreeViewer;
        protected createPart(): void;
        protected fillContextMenu(menu: controls.Menu): void;
        getViewer(): controls.viewers.TreeViewer;
        layout(): void;
    }
}
declare namespace colibri.ui.ide {
    import viewers = controls.viewers;
    abstract class EditorViewerView extends ide.ViewerView {
        private _currentEditor;
        private _currentViewerProvider;
        private _viewerStateMap;
        private _tabSectionListener;
        constructor(id: string);
        protected createViewer(): viewers.TreeViewer;
        protected createPart(): void;
        fillContextMenu(menu: controls.Menu): void;
        abstract getViewerProvider(editor: EditorPart): EditorViewerProvider;
        private onWorkbenchEditorActivated;
        private onTabSectionSelected;
        getPropertyProvider(): controls.properties.PropertySectionProvider;
        getUndoManager(): any;
    }
}
declare namespace colibri.ui.ide {
    import io = core.io;
    abstract class FileEditor extends EditorPart {
        private _onFileStorageListener;
        private _savingThisEditor;
        constructor(id: string, factory: EditorFactory);
        save(): Promise<void>;
        private onFileStorageChanged;
        protected onEditorFileNameChanged(): void;
        protected abstract onEditorInputContentChangedByExternalEditor(): any;
        onPartClosed(): boolean;
        setInput(file: io.FilePath): void;
        getInput(): core.io.FilePath;
        getIcon(): controls.IImage;
    }
}
declare namespace colibri.core.io {
    interface FilePath extends colibri.ui.ide.IEditorInput {
    }
}
declare namespace colibri.ui.ide {
    class FileEditorInputExtension extends EditorInputExtension {
        static ID: string;
        constructor();
        getEditorInputState(input: core.io.FilePath): {
            filePath: string;
        };
        createEditorInput(state: any): IEditorInput;
        getEditorInputId(input: core.io.FilePath): string;
    }
}
declare namespace colibri.ui.ide {
    class FileImage extends controls.DefaultImage {
        private _file;
        constructor(file: core.io.FilePath);
        getFile(): core.io.FilePath;
        preload(): Promise<controls.PreloadResult>;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<controls.PreloadResult>;
    }
}
declare namespace colibri.ui.ide {
    import io = core.io;
    class FileUtils {
        static visit(folder: io.FilePath, visitor: (file: io.FilePath) => void): void;
        static visitProject(visitor: (file: io.FilePath) => void): void;
        static getFileNameWithoutExtension(filename: string): string;
        static getFileCopyName(file: io.FilePath): string;
        static preloadImageSize(file: io.FilePath): Promise<controls.PreloadResult>;
        static getImageSize(file: io.FilePath): core.io.ImageSize;
        static getImage(file: io.FilePath): FileImage;
        static preloadAndGetFileString(file: io.FilePath): Promise<string>;
        static getFileString(file: io.FilePath): string;
        static setFileString_async(file: io.FilePath, content: string): Promise<void>;
        static getFileStringCache(): io.FileStringCache;
        static getFileStorage(): io.IFileStorage;
        static createFile_async(folder: io.FilePath, fileName: string, content: string): Promise<io.FilePath>;
        static createFolder_async(container: io.FilePath, folderName: string): Promise<io.FilePath>;
        static deleteFiles_async(files: io.FilePath[]): Promise<void>;
        static renameFile_async(file: io.FilePath, newName: string): Promise<void>;
        static moveFiles_async(movingFiles: io.FilePath[], moveTo: io.FilePath): Promise<void>;
        static copyFile_async(fromFile: io.FilePath, toFile: io.FilePath): Promise<io.FilePath>;
        static createProject_async(templatePath: string, projectName: string): Promise<boolean>;
        static preloadFileString(file: io.FilePath): Promise<ui.controls.PreloadResult>;
        static getPublicRoot(folder: io.FilePath): io.FilePath;
        static getFileFromPath(path: string, parent?: io.FilePath): io.FilePath;
        static uploadFile_async(uploadFolder: io.FilePath, file: File): Promise<io.FilePath>;
        static getFilesWithContentType(contentType: string): Promise<io.FilePath[]>;
        static getAllFiles(): io.FilePath[];
        static getRoot(): io.FilePath;
        static distinct(folders: io.FilePath[]): io.FilePath[];
        static compareFiles(a: io.FilePath, b: io.FilePath): number;
        static sorted(folders: io.FilePath[]): io.FilePath[];
    }
}
declare namespace colibri.ui.ide {
    interface IEditorInput {
        getEditorInputExtension(): string;
    }
}
declare namespace colibri.ui.ide {
    class IconAtlasLoaderExtension extends Extension {
        static POINT_ID: string;
        private _plugin;
        constructor(plugin: Plugin);
        preload(): Promise<void>;
    }
}
declare namespace colibri.ui.ide {
    class IconLoaderExtension extends Extension {
        static POINT_ID: string;
        static withPluginFiles(plugin: colibri.Plugin, iconNames: string[], common?: boolean): IconLoaderExtension;
        private _icons;
        constructor(icons: controls.IconImage[]);
        getIcons(): controls.IconImage[];
    }
}
declare namespace colibri.ui.ide {
    class ImageFileCache extends core.io.SyncFileContentCache<FileImage> {
        constructor();
    }
}
declare namespace colibri.ui.ide {
    class ImageSizeFileCache extends core.io.FileContentCache<core.io.ImageSize> {
        constructor();
    }
}
declare namespace colibri.ui.ide {
    class MainToolbar extends controls.Control {
        private _leftArea;
        private _centerArea;
        private _rightArea;
        private _currentManager;
        constructor();
        getLeftArea(): HTMLElement;
        getCenterArea(): HTMLElement;
        getRightArea(): HTMLElement;
        private handleEditorActivated;
    }
}
declare namespace colibri.ui.ide {
    class PluginResourceLoaderExtension extends Extension {
        static POINT_ID: string;
        private _loader;
        constructor(loader?: () => Promise<void>);
        preload(): Promise<void>;
    }
}
declare namespace colibri.ui.ide {
    abstract class PreloadProjectResourcesExtension extends Extension {
        static POINT_ID: string;
        constructor();
        abstract computeTotal(): Promise<number>;
        abstract preload(monitor: controls.IProgressMonitor): Promise<any>;
    }
}
declare namespace colibri.ui.ide {
    import io = colibri.core.io;
    class QuickEditorDialog extends controls.dialogs.Dialog {
        private _file;
        private _editor;
        private _saveButton;
        private _editorState;
        constructor(file: io.FilePath, editorState?: any);
        goFront(): void;
        createDialogArea(): void;
        processKeyCommands(): boolean;
        create(): void;
        close(): void;
        getEditorState(): any;
        getEditor(): EditorPart;
    }
}
declare namespace colibri.ui.ide {
    class Resources {
        private _plugin;
        private _res;
        constructor(plugin: Plugin);
        preload(): Promise<void>;
        getResString(key: string): string;
        getResData(key: string): any;
    }
}
declare namespace colibri.ui.ide {
    class ViewFolder extends PartFolder {
        constructor(...classList: string[]);
    }
}
declare namespace colibri.ui.ide {
    abstract class ViewerFileEditor extends FileEditor {
        protected _filteredViewer: controls.viewers.FilteredViewer<any>;
        protected _viewer: controls.viewers.TreeViewer;
        constructor(id: string, editorFactory: EditorFactory);
        protected abstract createViewer(): controls.viewers.TreeViewer;
        protected createPart(): void;
        protected createFilteredViewer(viewer: controls.viewers.TreeViewer): controls.viewers.FilteredViewer<controls.viewers.TreeViewer>;
        protected fillContextMenu(menu: controls.Menu): void;
        getViewer(): controls.viewers.TreeViewer;
        layout(): void;
    }
}
declare namespace colibri.ui.ide {
    type CreateWindowFunc = () => WorkbenchWindow;
    class WindowExtension extends Extension {
        static POINT_ID: string;
        private _createWindowFunc;
        constructor(createWindowFunc: CreateWindowFunc);
        createWindow(): WorkbenchWindow;
    }
}
declare namespace colibri.ui.ide {
    abstract class WorkbenchWindow extends controls.Control {
        private _toolbar;
        private _clientArea;
        private _id;
        private _created;
        constructor(id: string);
        saveState(prefs: colibri.core.preferences.Preferences): void;
        restoreState(prefs: colibri.core.preferences.Preferences): void;
        protected saveEditorsState(prefs: colibri.core.preferences.Preferences): void;
        protected restoreEditors(prefs: colibri.core.preferences.Preferences): void;
        private openFromUrlSearchParameter;
        private onStorageChanged;
        create(): void;
        protected abstract createParts(): any;
        getId(): string;
        getToolbar(): MainToolbar;
        getClientArea(): controls.Control;
        getViews(): ViewPart[];
        getView(viewId: string): ViewPart;
        private findViews;
        protected createViewFolder(...parts: Part[]): ViewFolder;
        abstract getEditorArea(): EditorArea;
    }
}
declare namespace colibri.ui.ide {
    class WorkbenchWindowLayout implements controls.ILayout {
        layout(parent: controls.Control): void;
    }
}
declare namespace colibri.ui.ide {
    const IMG_SECTION_PADDING = 10;
}
declare namespace colibri.ui.ide.commands {
    interface IKeyMatcherConfig {
        control?: boolean;
        shift?: boolean;
        alt?: boolean;
        meta?: boolean;
        key?: string;
        keyLabel?: string;
        filterInputElements?: boolean;
    }
    class KeyMatcher {
        private _control;
        private _shift;
        private _alt;
        private _key;
        private _filterInputElements;
        constructor(config: IKeyMatcherConfig);
        getKeyString(): string;
        private clearKeyCode;
        matchesKeys(event: KeyboardEvent): boolean;
        matchesTarget(element: EventTarget): boolean;
    }
}
declare namespace colibri.ui.ide.actions {
    const CAT_GENERAL = "colibri.ui.ide.actions.GeneralCategory";
    const CAT_EDIT = "colibri.ui.ide.actions.EditCategory";
    const CMD_SAVE = "colibri.ui.ide.actions.Save";
    const CMD_EDITOR_TABS_SIZE_UP = "colibri.ui.ide.actions.EditorTabsSizeUp";
    const CMD_EDITOR_TABS_SIZE_DOWN = "colibri.ui.ide.actions.EditorTabsSizeDown";
    const CMD_EDITOR_CLOSE = "colibri.ui.ide.actions.EditorClose";
    const CMD_EDITOR_CLOSE_ALL = "colibri.ui.ide.actions.EditorCloseAll";
    const CMD_DELETE = "colibri.ui.ide.actions.Delete";
    const CMD_RENAME = "colibri.ui.ide.actions.Rename";
    const CMD_UNDO = "colibri.ui.ide.actions.Undo";
    const CMD_REDO = "colibri.ui.ide.actions.Redo";
    const CMD_COLLAPSE_ALL = "colibri.ui.ide.actions.CollapseAll";
    const CMD_EXPAND_COLLAPSE_BRANCH = "colibri.ui.ide.actions.ExpandCollapseBranch";
    const CMD_SELECT_ALL = "colibri.ui.ide.actions.SelectAll";
    const CMD_ESCAPE = "colibri.ui.ide.actions.Escape";
    const CMD_UPDATE_CURRENT_EDITOR = "colibri.ui.ide.actions.UpdateCurrentEditor";
    const CMD_SHOW_COMMAND_PALETTE = "colibri.ui.ide.actions.ShowCommandPalette";
    const CMD_COPY = "colibri.ui.ide.actions.Copy";
    const CMD_CUT = "colibri.ui.ide.actions.Cut";
    const CMD_PASTE = "colibri.ui.ide.actions.Paste";
    const CMD_SHOW_COMMENT_DIALOG = "colibri.ui.ide.actions.ShowCommentDialog";
    const CMD_CHANGE_THEME = "phasereditor2d.ide.ui.actions.SwitchTheme";
    const CMD_INCR_CANVAS_FONT_HEIGHT = "phasereditor2d.ide.ui.actions.IncrementCanvasFontHeight";
    const CMD_DECR_CANVAS_FONT_HEIGHT = "phasereditor2d.ide.ui.actions.DecrementCanvasFontHeight";
    const CMD_RESET_CANVAS_FONT_HEIGHT = "phasereditor2d.ide.ui.actions.ResetCanvasFontHeight";
    class ColibriCommands {
        static registerCommands(manager: commands.CommandManager): void;
        static initFontSize(manager: commands.CommandManager): void;
        private static initTheme;
        private static initCommentDialog;
        private static initPalette;
        private static initEditors;
        private static initViewer;
        private static initUndo;
        private static initEdit;
    }
}
declare namespace colibri.ui.ide.actions {
    abstract class PartAction<T extends ide.Part> extends controls.Action {
        private _part;
        constructor(part: T, config: controls.IActionConfig);
        getPart(): T;
    }
}
declare namespace colibri.ui.ide.actions {
    abstract class ViewerViewAction<T extends ide.ViewerView> extends PartAction<T> {
        constructor(view: T, config: controls.IActionConfig);
        getViewViewer(): controls.viewers.TreeViewer;
        getViewViewerSelection(): any[];
    }
}
declare namespace colibri.ui.ide.commands {
    interface ICommandConfig {
        id: string;
        name: string;
        tooltip: string;
        icon?: controls.IImage;
        category: string;
    }
    class Command {
        private _id;
        private _name;
        private _tooltip;
        private _icon;
        private _categoryId;
        constructor(config: ICommandConfig);
        getCategoryId(): string;
        getId(): string;
        getName(): string;
        getTooltip(): string;
        getIcon(): controls.IImage;
    }
}
declare namespace colibri.ui.ide.commands {
    class HandlerArgs {
        readonly activePart: Part;
        readonly activeEditor: EditorPart;
        readonly activeElement: HTMLElement;
        readonly activeMenu: controls.Menu;
        readonly activeWindow: ide.WorkbenchWindow;
        readonly activeDialog: controls.dialogs.Dialog;
        constructor(activePart: Part, activeEditor: EditorPart, activeElement: HTMLElement, activeMenu: controls.Menu, activeWindow: ide.WorkbenchWindow, activeDialog: controls.dialogs.Dialog);
    }
}
declare namespace colibri.ui.ide.commands {
    class CommandExtension extends Extension {
        static POINT_ID: string;
        private _configurer;
        constructor(configurer: (manager: CommandManager) => void);
        getConfigurer(): (manager: CommandManager) => void;
    }
}
declare namespace colibri.ui.ide.commands {
    interface IHandlerConfig {
        testFunc?: (args: HandlerArgs) => boolean;
        executeFunc?: (args: HandlerArgs) => void;
    }
    class CommandHandler {
        private _testFunc;
        private _executeFunc;
        constructor(config: IHandlerConfig);
        test(args: HandlerArgs): boolean;
        execute(args: HandlerArgs): void;
    }
}
declare namespace colibri.ui.ide.commands {
    class CommandManager {
        private _commandIdMap;
        private _commands;
        private _commandMatcherMap;
        private _commandHandlerMap;
        private _categoryMap;
        private _categories;
        constructor();
        printTable(): void;
        private onKeyDown;
        private preventKeyEvent;
        canRunCommand(commandId: string): boolean;
        private testHandler;
        private executeHandler;
        addCategory(category: ICommandCategory): void;
        getCategories(): ICommandCategory[];
        getCategory(id: string): ICommandCategory;
        addCommand(cmd: Command): void;
        addCommandHelper(config: {
            id: string;
            name: string;
            tooltip: string;
            category: string;
            icon?: controls.IImage;
        }): void;
        private makeArgs;
        getCommands(): Command[];
        getActiveCommands(): Command[];
        getCommand(id: string): Command;
        getCommandKeyString(commandId: string): string;
        executeCommand(commandId: string, checkContext?: boolean): void;
        addKeyBinding(commandId: string, matcher: KeyMatcher): void;
        addKeyBindingHelper(commandId: string, config: IKeyMatcherConfig): void;
        addHandler(commandId: string, handler: CommandHandler): void;
        addHandlerHelper(commandId: string, testFunc: (args: HandlerArgs) => boolean, executeFunc: (args: HandlerArgs) => void): void;
        add(args: {
            command?: ICommandConfig;
            handler?: IHandlerConfig;
            keys?: IKeyMatcherConfig;
        }, commandId?: string): void;
    }
}
declare namespace colibri.ui.ide.commands {
    interface ICommandCategory {
        id: string;
        name: string;
    }
}
declare namespace colibri.ui.ide.properties {
    abstract class BaseImagePreviewSection<T> extends controls.properties.PropertySection<T> {
        static createSectionForm(parent: HTMLElement, section: controls.properties.PropertySection<any>, getImage: () => controls.IImage): void;
        createForm(parent: HTMLDivElement): void;
        protected abstract getSelectedImage(): controls.IImage;
        canEditNumber(n: number): boolean;
    }
}
declare namespace colibri.ui.ide.properties {
    import controls = colibri.ui.controls;
    abstract class BaseManyImagePreviewSection<T> extends controls.properties.PropertySection<T> {
        createForm(parent: HTMLDivElement): void;
        protected abstract getViewerInput(): Promise<unknown>;
        protected abstract prepareViewer(viewer: controls.viewers.TreeViewer): any;
        canEditNumber(n: number): boolean;
    }
}
declare namespace colibri.ui.ide.properties {
    class FilteredViewerInPropertySection<T extends controls.viewers.TreeViewer> extends controls.viewers.FilteredViewer<T> {
        constructor(page: controls.properties.PropertyPage, viewer: T, showZoomControls: boolean, ...classList: string[]);
        resizeTo(): void;
    }
}
declare namespace colibri.ui.ide.themes {
    class ThemeExtension extends Extension {
        static POINT_ID: string;
        private _theme;
        constructor(theme: controls.ITheme);
        getTheme(): controls.ITheme;
    }
}
declare namespace colibri.ui.ide.undo {
    abstract class Operation {
        abstract undo(): void;
        abstract redo(): void;
        execute(): Promise<any>;
    }
}
declare namespace colibri.ui.ide.undo {
    class UndoManager {
        private _undoList;
        private _redoList;
        constructor();
        add(op: Operation): Promise<void>;
        clear(): void;
        undo(): void;
        redo(): void;
    }
}
declare namespace colibri.ui.ide.utils {
    type GetName = (obj: any) => string;
    export class NameMaker {
        private _getName;
        private _nameSet;
        constructor(getName: GetName);
        update(objects: any[]): void;
        static trimNumbering(name: string): string;
        makeName(baseName: string): string;
    }
    export {};
}
//# sourceMappingURL=colibri.d.ts.map