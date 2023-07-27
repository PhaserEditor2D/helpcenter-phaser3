namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export abstract class AbstractFileSection extends controls.properties.PropertySection<any> {

        abstract getFileInfo(): { filename: string, path: string };

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent, 2);

            // filename
            {
                this.createLabel(comp, "File Name");

                const text = this.createText(comp, true);

                this.addUpdater(() => {

                    text.value = this.getFileInfo().filename;
                });
            }

            // path
            {

                this.createLabel(comp, "Path");

                const text = this.createText(comp, true);

                this.addUpdater(() => {

                    text.value = this.getFileInfo().path;
                });
            }
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}