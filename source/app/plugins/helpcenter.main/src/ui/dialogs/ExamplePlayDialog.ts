namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class PlayDialog extends controls.dialogs.Dialog {


        private _example: phaser.core.ExampleInfo;

        constructor(example: phaser.core.ExampleInfo) {
            super();

            this._example = example;

            this.setSize(830, 670);
        }

        createDialogArea() {

            const clientArea = document.createElement("iframe");
            clientArea.classList.add("DialogClientArea");
            clientArea.style.width = "auto";
            clientArea.style.height = "auto";

            const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "mobile");

            console.log("Playing " + url);

            clientArea.src = url;

            this.getElement().appendChild(clientArea);
        }

        create() {

            super.create();

            this.addButton("Close", () => this.close());

            this.addButton("View Source", () => {

                colibri.Platform.getWorkbench().openEditor(this._example);
                this.close();
            });

            this.addButton("Open In Sandbox", () => {

                const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "edit");
                window.open(url);
            });

            this.addButton("Open In Phaser Labs", () => {

                const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "view");
                window.open(url);
            });
        }
    }
}