namespace helpcenter.phaser.ui {

    import controls = colibri.ui.controls;

    export class ExampleImageReader {

        private _textureCount = 4;

        async load() {

            for (let i = 0; i < this._textureCount; i++) {

                const texUrl = PhaserPlugin.getInstance().getResourceURL(`data/examples-screenshots-atlas/texture-${i}.jpg`);

                const texImage = controls.Controls.getImage(texUrl, texUrl, true);
            }
        }
    }
}