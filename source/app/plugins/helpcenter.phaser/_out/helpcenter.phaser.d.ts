declare namespace helpcenter.phaser {
    const PHASER_VER = "3.24.1";
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
        private sort;
    }
}
declare namespace helpcenter.phaser.core {
    class DocEntry {
        private _rawEntry;
        constructor(rawEntry: IJSDocEntry);
        getRawEntry(): IJSDocEntry;
    }
}
declare namespace helpcenter.phaser.core {
    type JSDocEntryKind = "member" | "function" | "namespace" | "typedef" | "class" | "event" | "constant" | "package";
    export interface IJSDocEntry {
        comment: string;
        longname: string;
        memberof: string;
        kind: JSDocEntryKind;
        scope: "global";
        meta: {
            filename: string;
            lineno: number;
            columnno: number;
            path: string;
            name: string;
        };
        children: IJSDocEntry[];
        parent: IJSDocEntry;
        folder: PhaserFile;
    }
    export {};
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
        constructor(name: string, isFolder: boolean, docEntry: IJSDocEntry);
        getDocEntry(): DocEntry;
        getChild(name: string): PhaserFile;
        getChildren(): PhaserFile[];
        getOrMakeChild(name: string, isFolder: boolean, entry: IJSDocEntry): PhaserFile;
        getParent(): PhaserFile;
        getDocsEntries(): DocEntry[];
        getName(): string;
        isFolder(): boolean;
        isFile(): boolean;
    }
}
//# sourceMappingURL=helpcenter.phaser.d.ts.map