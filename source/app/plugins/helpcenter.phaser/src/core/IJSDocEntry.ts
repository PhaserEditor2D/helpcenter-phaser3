namespace helpcenter.phaser.core {

    export declare type JSDocEntryKind = "member" | "function" |
        "namespace" | "typedef" | "class" | "event" | "constant" | "package";

    export declare type IParamData = {
        type: { names: string[] } | string;
        description: string;
        name: string;
        optional: boolean;
    };

    export declare type IReturnData = {
        type: { names: string[] };
        description: string;
    }

    export declare type IMemberTypeData = {
        names: string[];
    }

    export interface IJSDocEntry {
        comment: string;
        longname: string;
        name: string;
        memberof: string;
        kind: JSDocEntryKind;
        scope: "global";
        params?: IParamData[],
        returns?: IReturnData[];
        type?: IMemberTypeData;
        meta: {
            filename: string;
            lineno: number;
            columnno: number;
            commentLines: number;
            path: string;
            name: string;
        }
    }
}