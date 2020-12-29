namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class DescriptionPropertySection extends controls.properties.PropertySection<phaser.core.DocEntry> {

        private _labelProvider: viewers.PhaserStyledLabelProvider;

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.DescriptionPropertySection", "Description", true, false);

            this._labelProvider = new ui.viewers.PhaserStyledLabelProvider();
        }

        createForm(parent: HTMLDivElement) {

            this.addUpdater(() => {

                const docEntry = this.getSelectionFirstElement();

                const builder = new core.HtmlJSDocBuilder(docEntry);

                parent.innerHTML = builder.build();
            });
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.DocEntry;
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}