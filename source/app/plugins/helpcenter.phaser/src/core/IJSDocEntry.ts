namespace helpcenter.phaser.core {

    declare type JSDocEntryKind = "member" | "function" |
        "namespace" | "typedef" | "class" | "event" | "constant" | "package";
    declare type JSDocEntryScope = "global" | "static" | "instance";

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
        }

        // computed
        children: IJSDocEntry[];
        parent: IJSDocEntry;
        folder: PhaserFile;
    }
}