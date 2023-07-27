namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class AboutDialog extends controls.dialogs.Dialog {

        constructor() {
            super();

            this.setSize(undefined, 300);
        }
        createDialogArea() {

            const clientArea = document.createElement("div");
            clientArea.classList.add("DialogClientArea");
            clientArea.style.padding = "10px";
            clientArea.style.height = "auto";
            clientArea.style.width = "auto";
            clientArea.style.overflowY = "scroll";
            clientArea.innerHTML = `
            <center>
                <img src="app/favicon.png">
                <h4>Unofficial Phaser Help Center</h4>
                <small><b>v${colibri.PRODUCT_VERSION} - Phaser ${phaser.PHASER_VER}</small></b>
                <p>Developed by the <a href="https://phasereditor2d.com" target="_blank">Phaser Editor 2D team</a></p>
                Advanced tool for browsing the Phaser docs and examples*.
                <p>GitHub: <a href="https://github.com/PhaserEditor2D/helpcenter-phaser3" target="_blank">helpcenter-phaser3</a></p>
                <p>Thanks: <a href="https://twitter.com/trashcanuseful" target="_blank">@trashcanuseful</a> (banner illustrations).</p>
                <small>*The examples and docs data are taken from the Phaser repositories</small>
            </center>
            `;

            this.getElement().appendChild(clientArea);
        }

        create() {

            super.create();

            this.setTitle("About");

            this.addButton("Close", () => this.close());
        }
    }
}