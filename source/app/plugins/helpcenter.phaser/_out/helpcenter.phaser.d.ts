declare namespace helpcenter.phaser {
    const PHASER_VER = "3.24.1";
    const DOC_ENTRY_KIND_LIST: string[];
    class PhaserPlugin extends colibri.Plugin {
        private static _instance;
        private _docsFile;
        private _docsNameMap;
        private _docsFolder;
        static getInstance(): any;
        constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        getDocsJSONFile(): core.IJSDocFile;
        getDocsFolder(): core.PhaserFile;
        started(): Promise<void>;
        private buildModel;
        private sortFile;
        getDocEntry(name: string): core.DocEntry;
    }
}
declare namespace helpcenter.phaser.core {
    class DocEntry {
        private _rawEntry;
        private _children;
        private _parent;
        constructor(rawEntry: IJSDocEntry);
        getParent(): DocEntry;
        setParent(parent: DocEntry): void;
        isFileRootElement(): boolean;
        getChildren(): DocEntry[];
        hasChildren(): boolean;
        getRawEntry(): IJSDocEntry;
        getKind(): JSDocEntryKind;
        getNameSignature(): string;
        getMethodSignature(): string;
        getReturnsTypeSignature(): string;
        getTypeSignature(): string;
    }
}
declare namespace helpcenter.phaser.core {
    type JSDocEntryKind = "member" | "function" | "namespace" | "typedef" | "class" | "event" | "constant" | "package";
    type IParamData = {
        type: {
            names: string[];
        } | string;
        description: string;
        name: string;
        optional: boolean;
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
        comment: string;
        longname: string;
        name: string;
        memberof: string;
        kind: JSDocEntryKind;
        scope: "global";
        params?: IParamData[];
        returns?: IReturnData[];
        type?: IMemberTypeData;
        meta: {
            filename: string;
            lineno: number;
            columnno: number;
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
    class PhaserFile {
        private _isFolder;
        private _name;
        private _docsEntries;
        private _children;
        private _childrenMap;
        private _parent;
        private _docEntry;
        constructor(name: string, isFolder: boolean, docEntry: DocEntry);
        getDocEntry(): DocEntry;
        getChild(name: string): PhaserFile;
        getChildren(): PhaserFile[];
        getOrMakeChild(name: string, isFolder: boolean, entry: DocEntry): PhaserFile;
        getParent(): PhaserFile;
        getDocsEntries(): DocEntry[];
        getName(): string;
        isFolder(): boolean;
        isFile(): boolean;
    }
}
//# sourceMappingURL=helpcenter.phaser.d.ts.map