namespace helpcenter.phaser.ui {

    import controls = colibri.ui.controls;

    interface IAtlasData {
        frames: {
            name: {
                frame: {
                    x: number,
                    y: number,
                    w: number,
                    h: number
                }
            },
        };
    }

    export class ExampleImageReader {

        private _textureCount = 4;
        private _imageMap: Map<string, controls.IImage>;

        async preload() {

            this._imageMap = new Map();

            for (let i = 0; i < this._textureCount; i++) {

                const texUrl = PhaserPlugin.getInstance().getResourceURL(`data/examples-screenshots-atlas/texture-${i}.jpg`);

                const texImage = controls.Controls.getImage(texUrl, texUrl, true);

                await texImage.preload();

                const atlasData = await PhaserPlugin.getInstance().getJSON(`data/examples-screenshots-atlas/texture-${i}.json`) as IAtlasData;

                let j = 0;

                // tslint:disable-next-line:forin
                for (const frameName in atlasData.frames) {

                    const f = atlasData.frames[frameName].frame;

                    const fd = controls.FrameData.fromRect(0, new controls.Rect(f.x, f.y, f.w, f.h));

                    const img = new controls.ImageFrame(frameName, texImage as controls.DefaultImage, fd);

                    console.log(f);

                    const key = frameName.replaceAll(".jpg", ".js").substring("screenshots/".length);

                    this._imageMap.set(key, img);

                    j++;
                }
            }
        }

        getImage(examplePath: string) {

            return this._imageMap.get(examplePath);
        }
    }
}