namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleSourceSection extends controls.properties.PropertySection<phaser.core.ExampleInfo | phaser.core.ExampleChain> {

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

                const obj = this.getSelectionFirstElement();

                let example: phaser.core.ExampleInfo;

                if (obj instanceof phaser.core.ExampleChain) {

                    example = obj.example;

                } else {

                    example = obj;
                }

                const html = helpcenter.showdown.javascriptToHtml(example.getSource());

                let html2 = html;
                let scrollToId: string;

                if (obj instanceof phaser.core.ExampleChain) {

                    const showLine = obj.lineNumber;
                    const bgColor = "rgba(0, 0, 255, 0.2)";
                    scrollToId = "line#" + obj.example.getPath() + "#" + showLine

                    html2 = "";

                    const lines = html.split("\n");

                    let n = 1;
                    let width = 0;
                    const plainLines = obj.example.getSource().split("\n");

                    for (const line of plainLines) {

                        width = Math.max(width, line.length);
                    }

                    for (const line of lines) {

                        if (n === showLine) {

                            const pad = " ".repeat(width - plainLines[n - 1].length);
                            html2 += `<div id='${scrollToId}' class='MarkCodeLine'>${line}${pad}</div>\n`;

                        } else {

                            html2 += `${line}\n`;
                        }

                        n++;
                    }
                }

                comp.innerHTML = html2;

                if (scrollToId) {

                    const elem = document.getElementById(scrollToId);
                    elem.scrollIntoView();
                }
            });
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