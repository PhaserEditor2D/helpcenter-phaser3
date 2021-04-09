namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleImageSection
        extends colibri.ui.ide.properties.BaseImagePreviewSection
        <phaser.core.ExampleInfo | phaser.core.ExampleChain> {

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

            const obj = this.getSelectionFirstElement();

            return obj instanceof phaser.core.ExampleChain ? obj.example : obj;
        }

        canEdit(obj: any, n: number): boolean {

            if (obj instanceof phaser.core.ExampleInfo || obj instanceof phaser.core.ExampleChain) {

                const img = this.getSelectedImage();

                return img !== null && img !== undefined;
            }

            return false;
        }
    }
}