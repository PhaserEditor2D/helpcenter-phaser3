namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class DescriptionSection extends controls.properties.PropertySection<phaser.core.DocEntry> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.DescriptionPropertySection", "Description", true, false);
        }

        createForm(parent: HTMLDivElement) {

            this.addUpdater(() => {

                const docEntry = phaser.core.DocEntry.getDocEntry(this.getSelectionFirstElement());

                const builder = new core.HtmlJSDocBuilder(docEntry);

                parent.innerHTML = builder.build();
            });
        }

        canEdit(obj: any, n: number): boolean {

            return phaser.core.DocEntry.canAdapt(obj);
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}