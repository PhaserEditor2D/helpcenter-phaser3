namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class AboutDialog extends controls.dialogs.Dialog {


        createDialogArea() {

            const clientArea = document.createElement("div");
            clientArea.classList.add("DialogClientArea");
            clientArea.style.padding = "10px";
            clientArea.style.height = "min-content";
            clientArea.style.width = "auto";
            clientArea.innerHTML = `
            <h3><center>Unofficial Phaser Help Center</center></h3>
            <p>A tool for browsing the Phaser docs and examples.</p>
            <p>Developed by the <a href="https://phasereditor2d.com">Phaser Editor 2D team</a></p>
            <p>GitHub: <a href="https://github.com/PhaserEditor2D/helpcenter-phaser3">helpcenter-phaser3</a></p>
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