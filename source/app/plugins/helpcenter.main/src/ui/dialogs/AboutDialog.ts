namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class AboutDialog extends controls.dialogs.Dialog {

        constructor() {
            super();
        }
        createDialogArea() {

            const clientArea = document.createElement("div");
            clientArea.classList.add("DialogClientArea");
            clientArea.style.padding = "10px";
            clientArea.style.height = "min-content";
            clientArea.style.width = "auto";
            clientArea.innerHTML = `
            <center>
                <img src="app/favicon.png">
                <h4>Unofficial Phaser Help Center</h4>
                A tool for browsing the <a https://phaser.io>Phaser</a> docs and examples.
                Developed by the <a href="https://phasereditor2d.com">Phaser Editor 2D team</a>
                <p>GitHub: <a href="https://github.com/PhaserEditor2D/helpcenter-phaser3">helpcenter-phaser3</a></p>
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