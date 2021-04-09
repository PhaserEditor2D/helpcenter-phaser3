namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleSourceSection extends controls.properties.PropertySection<phaser.core.ExampleInfo> {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.ExampleSourceSection", "Example Code", false, false);
        }

        createForm(parent: HTMLDivElement) {

            parent.classList.add("UserSelectText");

            const comp = document.createElement("pre");
            comp.classList.add("SmallScrollBar");
            comp.style.whiteSpace = "pre";
            comp.style.fontFamily = "monospace";
            comp.style.overflow = "auto";
            comp.style.maxHeight = "400px";
            comp.style.padding = "5px";

            parent.appendChild(comp);

            this.addUpdater(() => {

                const html = helpcenter.showdown.javascriptToHtml(this.getExample().getSource());

                comp.innerHTML = html;
            });
        }

        getExample() {

            return this.getSelectionFirstElement();
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.ExampleInfo && obj.getData().type === "file";
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }
    }
}