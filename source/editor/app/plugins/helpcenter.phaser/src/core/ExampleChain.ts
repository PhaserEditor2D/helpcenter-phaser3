namespace helpcenter.phaser.core {

    export class ExampleChain {

        constructor(
            public line: string,
            public lineNumber: number,
            public example: ExampleInfo
        ) {

            this.line = this.line.replaceAll("\t", " ").substring(0, 300);
        }
    }
}