namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleImageSection extends colibri.ui.ide.properties.BaseImagePreviewSection<phaser.core.ExampleInfo> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.ExampleImageSection", "Example Image", true, false);
        }

        protected getSelectedImage(): colibri.ui.controls.IImage {

            return phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(this.getExample().getPath());
        }

        createForm(parent: HTMLDivElement) {

            super.createForm(parent);

            parent.style.minHeight = "200px";
        }

        getExample() {

            return this.getSelectionFirstElement() as phaser.core.ExampleInfo;
        }

        canEdit(obj: any, n: number): boolean {

            if (obj instanceof phaser.core.ExampleInfo) {

                const img = this.getSelectedImage();

                return img !== null && img !== undefined;
            }

            return false;
        }
    }
}