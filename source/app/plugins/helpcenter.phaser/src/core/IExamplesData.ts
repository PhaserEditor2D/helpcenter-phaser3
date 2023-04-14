namespace helpcenter.phaser.core {

    export interface IExamplesData {
        path: string;
        name: string;
        children: IExamplesData[],
        type?: "file" | "directory";
    }
}