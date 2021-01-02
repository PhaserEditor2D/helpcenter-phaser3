namespace helpcenter.phaser.core {

    interface IExampleEditorInputState {

        path: string;
    }

    export class ExampleEditorInputExtension extends colibri.ui.ide.EditorInputExtension {

        static ID = "helpcenter.main.ui.editors.ExampleEditorInputExtension";

        constructor() {
            super(PhaserFileEditorInputExtension.ID);
        }

        createEditorInput(state: IExampleEditorInputState): colibri.ui.ide.IEditorInput {

            return PhaserPlugin.getInstance().getExampleByPath(state.path);
        }

        getEditorInputState(input: ExampleInfo): IExampleEditorInputState {

            return {
                path: input.getPath()
            }
        }

        getEditorInputId(input: ExampleInfo): string {

            return input.getPath();
        }
    }
}