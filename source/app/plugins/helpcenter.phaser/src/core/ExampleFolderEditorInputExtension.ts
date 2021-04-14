namespace helpcenter.phaser.core {

    interface IExampleEditorInputState {

        path: string;
    }

    export class ExampleFolderEditorInputExtension extends colibri.ui.ide.EditorInputExtension {

        static ID = "helpcenter.main.ui.editors.ExampleFolderEditorInputExtension";

        constructor() {
            super(ExampleFolderEditorInputExtension.ID);
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