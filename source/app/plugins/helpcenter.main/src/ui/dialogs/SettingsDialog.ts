namespace helpcenter.main.ui.dialogs {

    import controls = colibri.ui.controls;

    export class SettingsDialog extends controls.dialogs.Dialog {
        private _phaserLabsUrlText: HTMLInputElement;

        createDialogArea() {

            const clientArea = document.createElement("div");
            clientArea.classList.add("DialogClientArea");

            clientArea.style.display = "grid";
            clientArea.style.gridTemplateColumns = "auto 1fr";
            clientArea.style.gridTemplateRows = "repeat(2, min-content)";
            clientArea.style.alignItems = "center";
            clientArea.style.gap = "5px";
            clientArea.style.width = "auto";
            clientArea.style.padding = "0 10px";

            {
                // Phaser Labs URL

                const infoLabel = document.createElement("i");
                infoLabel.innerHTML = "Write a custom URL, like <code>http://127.0.0.1:8080</code>. "
                    + "Leave a blank value to restore the default URL.";
                infoLabel.style.gridColumn = "1 / span 2";
                infoLabel.style.marginTop = "10px";
                clientArea.appendChild(infoLabel);

                const label = document.createElement("label");
                clientArea.appendChild(label);
                label.innerText = "Phaser Labs URL";

                const text = document.createElement("input");
                clientArea.appendChild(text);
                text.value = phaser.PhaserPlugin.getInstance().getPhaserLabsUrl();
                this._phaserLabsUrlText = text;
            }

            this.getElement().appendChild(clientArea);
        }

        create() {

            super.create();

            this.setTitle("Settings");

            this.addButton("Apply", () => {

                const url = this._phaserLabsUrlText.value;

                phaser.PhaserPlugin.getInstance().setPhaserLabsUrl(url);

                this.close();
            });

            this.addCancelButton();
        }
    }
}