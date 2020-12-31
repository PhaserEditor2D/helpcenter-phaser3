namespace helpcenter.phaser.core {

    export interface IExamplesData {
        path: string;
        name: string;
        children: IExamplesData[],
        size?: number;
        extension?: string;
        type?: "file" | "directory";
    }
}