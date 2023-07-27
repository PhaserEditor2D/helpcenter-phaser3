namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class PlayDialog extends controls.dialogs.Dialog {


        private _example: phaser.core.ExampleInfo;
        private _gameFrame: HTMLIFrameElement;

        constructor(example: phaser.core.ExampleInfo) {
            super();

            this._example = example;

            this.setSize(815, 700);
        }

        createDialogArea() {

            const clientArea = document.createElement("iframe");
            clientArea.classList.add("DialogClientArea");
            clientArea.style.width = "100%";
            clientArea.style.height = "calc(100% - 5px)";
            clientArea.style.border = "none";

            const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "mobile");

            console.log("Playing " + url);

            clientArea.src = url;

            this._gameFrame = clientArea;

            this.getElement().appendChild(clientArea);
        }

        create() {

            super.create();

            this.setLocation(undefined, 10);

            this.setTitle(this._example.getName());

            this.addButton("Close", () => this.close());

            this.addButton("Refresh", () => {

                this._gameFrame.src = this._gameFrame.src;
            });

            this.addButton("View Source", () => {

                colibri.Platform.getWorkbench().openEditor(this._example);
                this.close();
            });

            this.addButton("Open In Phaser Labs", () => {

                const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "view");
                window.open(url);

            }).style.float = "left";

            this.addButton("Open In Sandbox", () => {

                const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "edit");
                window.open(url);

            }).style.float = "left";
        }
    }
}