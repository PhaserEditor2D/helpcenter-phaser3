namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleInfoSection extends controls.properties.PropertySection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {

        constructor(page: controls.properties.PropertyPage, id = "helpcenter.main.ui.properties.ExampleInfoSection") {
            super(page, id, "Example Info", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent, 3);
            comp.style.gridTemplateColumns = "auto 1fr auto";

            {
                // File Path

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
                // Play here

                const btn = this.createButton(comp, "Play", () => {

                    MainPlugin.getInstance().playExample(this.getSelectionFirstElement().example);
                });

                btn.style.gridColumn = "1 / span 3";
            }
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.ExampleChain || obj instanceof phaser.core.ExampleInfo;
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}