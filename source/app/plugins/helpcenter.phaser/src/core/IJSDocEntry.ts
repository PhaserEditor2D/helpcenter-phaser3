namespace helpcenter.phaser.core {

    export declare type JSDocEntryKind = "member" | "function" |
        "namespace" | "typedef" | "class" | "event" | "constant" | "package";

    export declare type IParamData = {
        type: { names: string[] };
        description: string;
        name: string;
        optional: boolean;
        defaultvalue: any;
    };

    export declare type IReturnData = {
        type: { names: string[] };
        description: string;
    }

    export declare type IMemberTypeData = {
        names: string[];
    }

    export interface IJSDocEntry {
        description: string;
        longname: string;
        name: string;
        memberof: string;
        kind: JSDocEntryKind;
        scope: "global";
        params?: IParamData[],
        returns?: IReturnData[];
        type?: IMemberTypeData;
        since: string;
        fires:string[],
        augments: string[],
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