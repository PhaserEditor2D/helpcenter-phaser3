namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleInfoSection extends controls.properties.PropertySection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.ExampleInfoSection", "Example Info", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent, 3);
            comp.style.gridTemplateColumns = "auto 1fr auto";

            {
                this.createLabel(comp, "File Path", "Relative path in the Phaser repository.");

                const text = this.createText(comp, true);

                this.addUpdater(() => {

                    text.value = this.getSelectionFirstElement().example.getPath();
                });

                this.createButton(comp, "Open", () => {
                    
                    colibri.Platform.getWorkbench().openEditor(this.getSelectionFirstElement().example);
                });
            }

            {
                this.createLabel(comp, "Official URL", "Address to the example in the Phaser website.");

                const text = this.createText(comp, true);

                this.addUpdater(() => {

                    text.value = phaser.PhaserPlugin.getInstance()
                        .getPhaserLabsPlayExampleUrl(this.getSelectionFirstElement().example);
                });

                this.createButton(comp, "Open", () => {

                    MainPlugin.getInstance().runExampleInPhaserWebsite(this.getSelectionFirstElement().example);
                });
            }
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.ExampleChain
                || obj instanceof phaser.core.ExampleInfo && obj.getData().type === "file";
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}