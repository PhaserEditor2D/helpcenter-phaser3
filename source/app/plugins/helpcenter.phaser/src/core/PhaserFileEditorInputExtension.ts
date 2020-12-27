namespace helpcenter.phaser.core {

    interface IPhaserFileEditorInputState {

        filePath: string;
    }

    export class PhaserFileEditorInputExtension extends colibri.ui.ide.EditorInputExtension {

        static ID = "helpcenter.main.ui.editors.PhaserFileEditorInputExtension";

        constructor() {
            super(PhaserFileEditorInputExtension.ID);
        }

        createEditorInput(state: IPhaserFileEditorInputState): colibri.ui.ide.IEditorInput {

            return PhaserPlugin.getInstance().getPhaserFile(state.filePath);
        }

        getEditorInputState(input: PhaserFile): IPhaserFileEditorInputState {

            return {
                filePath: input.getPath()
            }
        }

        getEditorInputId(input: PhaserFile): string {

            return input.getPath();
        }
    }
}