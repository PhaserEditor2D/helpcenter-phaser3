namespace helpcenter.phaser.core {

    interface IDocEntryEditorInputState {

        fullName: string;
    }

    export class JSDocEntryEditorInputExtension extends colibri.ui.ide.EditorInputExtension {

        static ID = "helpcenter.main.ui.editors.DocEntryEditorInputExtension";

        constructor() {
            super(JSDocEntryEditorInputExtension.ID);
        }

        createEditorInput(state: IDocEntryEditorInputState): colibri.ui.ide.IEditorInput {

            return PhaserPlugin.getInstance().getDocEntry(state.fullName);
        }

        getEditorInputState(input: DocEntry): IDocEntryEditorInputState {

            return {
                fullName: input.getFullName()
            }
        }

        getEditorInputId(input: DocEntry): string {

            return input.getFullName()
        }
    }
}