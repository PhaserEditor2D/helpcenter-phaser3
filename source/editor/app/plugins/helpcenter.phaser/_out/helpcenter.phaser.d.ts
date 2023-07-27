declare namespace helpcenter.phaser {
    let PHASER_VER: string;
    let DEFAULT_PHASER_LABS_URL: string;
    const DOC_ENTRY_KIND_LIST: string[];
    class PhaserPlugin extends colibri.Plugin {
        private static _instance;
        private _docsFile;
        private _docsNameMap;
        private _docsFolder;
        private _sourceMap;
        private _docEntries;
        private _examples;
        private _exampleImageReader;
        private _exampleMap;
        private _exampleChains;
        private _flatNamespaces;
        static getInstance(): PhaserPlugin;
        constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        private readPhaserExamplesCode;
        private readPhaserExamples;
        private readPhaserCode;
        private readPhaserDocs;
        private addTypeToData;
        private buildExamplesMap;
        getPhaserLabsUrl(path?: string): string;
        setPhaserLabsUrl(url: string): void;
        getPhaserLabsPlayExampleUrl(example: core.ExampleInfo, page?: "view" | "mobile" | "edit"): string;
        getExampleChains(): core.ExampleChain[];
        getExamples(): core.ExampleInfo[];
        getExampleByPath(path: string): core.ExampleInfo;
        getExampleImageReader(): ui.ExampleImageReader;
        getPhaserFileSource(file: string | phaser.core.PhaserFile): string;
        getDocsJSONFile(): core.IJSDocFile;
        getDocsFolder(): core.PhaserFile;
        getDocsEntries(): core.DocEntry[];
        getPhaserFile(filePath: string): core.PhaserFile;
        started(): Promise<void>;
        static cleanApiName(name: string): string;
        private buildModel;
        getFlatNamespaces(): core.DocEntry[];
        findSubtypes(typeName: string): string[];
        private sortFile;
        getDocEntry(name: string): core.DocEntry;
        getPhaserDocEntry(): core.DocEntry;
    }
}
declare namespace helpcenter.phaser.core {
    class DocEntry implements colibri.ui.ide.IEditorInput {
        private _rawEntry;
        private _children;
        private _parent;
        private _file;
        constructor(rawEntry: IJSDocEntry);
        getEditorInputExtension(): string;
        static canAdapt(obj: any): boolean;
        static getDocEntry(obj: any): DocEntry;
        visit(visitor: (entry: DocEntry) => void): void;
        getFile(): PhaserFile;
        setFile(file: PhaserFile): void;
        getParent(): DocEntry;
        setParent(parent: DocEntry): void;
        getChildren(): DocEntry[];
        hasChildren(): boolean;
        getRawEntry(): IJSDocEntry;
        isNamespace(): boolean;
        isInherited(): boolean;
        getType(): IMemberTypeData;
        getKind(): JSDocEntryKind;
        getDescription(): string;
        getName(): string;
        getFullName(): string;
        getMethodSignature(): string;
        getReturnsTypeSignature(): string;
        getTypeSignature(): string;
    }
}
declare namespace helpcenter.phaser.core {
    class ExampleChain {
        line: string;
        lineNumber: number;
        example: ExampleInfo;
        constructor(line: string, lineNumber: number, example: ExampleInfo);
    }
}
declare namespace helpcenter.phaser.core {
    interface IExampleEditorInputState {
        path: string;
    }
    export class ExampleFolderEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
        static ID: string;
        constructor();
        createEditorInput(state: IExampleEditorInputState): colibri.ui.ide.IEditorInput;
        getEditorInputState(input: ExampleInfo): IExampleEditorInputState;
        getEditorInputId(input: ExampleInfo): string;
    }
    export {};
}
declare namespace helpcenter.phaser.core {
    class ExampleInfo implements colibri.ui.ide.IEditorInput {
        private _data;
        private _name;
        private _path;
        private _parent;
        private _source;
        private _children;
        private _isMultiFile;
        constructor(parent: ExampleInfo, data: IExamplesData);
        isPlayable(): boolean;
        isMultiFile(): boolean;
        isMultiFileChild(): boolean;
        get example(): this;
        getEditorInputExtension(): string;
        getChildren(): ExampleInfo[];
        getSource(): string;
        setSource(source: string): void;
        getPath(): string;
        getName(): string;
        getParent(): ExampleInfo;
        getData(): IExamplesData;
    }
}
declare namespace helpcenter.phaser.core {
    interface IExamplesData {
        path: string;
        name: string;
        children: IExamplesData[];
        type?: "file" | "directory";
    }
}
declare namespace helpcenter.phaser.core {
    type JSDocEntryKind = "member" | "function" | "namespace" | "typedef" | "class" | "event" | "constant" | "package";
    type IParamData = {
        type: {
            names: string[];
        };
        description: string;
        name: string;
        optional: boolean;
        defaultvalue: any;
    };
    type IReturnData = {
        type: {
            names: string[];
        };
        description: string;
    };
    type IMemberTypeData = {
        names: string[];
    };
    interface IJSDocEntry {
        description: string;
        longname: string;
        name: string;
        memberof: string;
        kind: JSDocEntryKind;
        scope: "global";
        params?: IParamData[];
        returns?: IReturnData[];
        type?: IMemberTypeData;
        since: string;
        fires: string[];
        augments: string[];
        inherited?: boolean;
        inherits?: string;
        meta: {
            filename: string;
            lineno: number;
            columnno: number;
            commentLines: number;
            path: string;
            name: string;
        };
    }
}
declare namespace helpcenter.phaser.core {
    interface IJSDocFile {
        docs: IJSDocEntry[];
    }
}
declare namespace helpcenter.phaser.core {
    interface IDocEntryEditorInputState {
        fullName: string;
    }
    export class JSDocEntryEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
        static ID: string;
        constructor();
        createEditorInput(state: IDocEntryEditorInputState): colibri.ui.ide.IEditorInput;
        getEditorInputState(input: DocEntry): IDocEntryEditorInputState;
        getEditorInputId(input: DocEntry): string;
    }
    export {};
}
declare namespace helpcenter.phaser.core {
    class PhaserFile implements colibri.ui.ide.IEditorInput {
        private _isFolder;
        private _name;
        private _docsEntries;
        private _children;
        private _childrenMap;
        private _parent;
        private _docEntry;
        constructor(name: string, isFolder: boolean, docEntry: DocEntry);
        getPath(): any;
        getEditorInputExtension(): string;
        getDocEntry(): DocEntry;
        getChild(name: string): PhaserFile;
        getChildren(): PhaserFile[];
        getOrMakeChild(name: string, isFolder: boolean, entry: DocEntry): PhaserFile;
        getParent(): PhaserFile;
        addDocEntry(docEntry: DocEntry): void;
        getDocEntries(): DocEntry[];
        getName(): string;
        isFolder(): boolean;
        isFile(): boolean;
    }
}
declare namespace helpcenter.phaser.core {
    interface IPhaserFileEditorInputState {
        filePath: string;
    }
    export class PhaserFileEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
        static ID: string;
        constructor();
        createEditorInput(state: IPhaserFileEditorInputState): colibri.ui.ide.IEditorInput;
        getEditorInputState(input: PhaserFile): IPhaserFileEditorInputState;
        getEditorInputId(input: PhaserFile): string;
    }
    export {};
}
declare namespace helpcenter.phaser.ui {
    import controls = colibri.ui.controls;
    class ExampleImageReader {
        private _textureCount;
        private _imageMap;
        preload(): Promise<void>;
        getImage(example: core.ExampleInfo): any;
        getImageFromPath(examplePath: string): controls.IImage;
    }
}
//# sourceMappingURL=helpcenter.phaser.d.ts.map