namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class DescriptionPropertySection extends controls.properties.PropertySection<phaser.core.DocEntry> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.DescriptionPropertySection", "Description", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const element = document.createElement("div");

            this.addUpdater(() => {

                const desc = this.getSelectionFirstElement().getDescription();

                const html = showdown.markdownToHtml(desc);

                element.innerHTML = html;
            });

            parent.appendChild(element);
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.DocEntry;
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}