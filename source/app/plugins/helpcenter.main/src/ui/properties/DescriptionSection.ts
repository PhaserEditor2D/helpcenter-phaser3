namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class DescriptionSection extends controls.properties.PropertySection<phaser.core.DocEntry> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.DescriptionPropertySection", "Description", true, false);
        }

        createForm(parent: HTMLDivElement) {

            this.addUpdater(() => {

                const builder = new core.HtmlJSDocBuilder(this.getDocEntry());

                parent.innerHTML = builder.build();
            });
        }

        hasMenu() {

            return true;
        }

        createMenu(menu: controls.Menu) {

            new DocEntryMenuCreator(this.getDocEntry()).createMenu(menu);
        }

        getDocEntry() {

            return phaser.core.DocEntry.getDocEntry(this.getSelectionFirstElement());
        }

        canEdit(obj: any, n: number): boolean {

            return phaser.core.DocEntry.canAdapt(obj);
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}