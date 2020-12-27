namespace helpcenter.main.ui.editors {

    export class PhaserFileInput implements colibri.ui.ide.IEditorInput {

        getEditorInputExtension(): string {

            return phaser.core.PhaserFileEditorInputExtension.ID;
        }
    }
}