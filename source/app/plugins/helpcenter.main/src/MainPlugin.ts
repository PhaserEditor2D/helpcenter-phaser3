namespace helpcenter.main {

    export const DOC_ENTRY_KIND_ICON_NAME = {
        "member": "symbol-variable",
        "function": "symbol-method",
        "namespace": "symbol-namespace",
        "typedef": "symbol-interface",
        "class": "symbol-class",
        "event": "symbol-field", // TODO
        "constant": "symbol-constant"
    };

    export const ICON_FILE_SCRIPT = "file-script";
    export const ICON_LABS = "experimental";
    export const ICON_HELP = "help";
    export const ICON_PLAY = "play";

    export class MainPlugin extends colibri.Plugin {

        private static _instance: MainPlugin;

        static getInstance() {

            return this._instance ?? (this._instance = new MainPlugin());
        }

        constructor() {
            super("helpcenter.main")
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            // icons

            reg.addExtension(colibri.ui.ide.IconLoaderExtension
                .withPluginFiles(this, phaser.DOC_ENTRY_KIND_LIST.map(kind => DOC_ENTRY_KIND_ICON_NAME[kind])));

            reg.addExtension(colibri.ui.ide.IconLoaderExtension
                .withPluginFiles(this, [
                    ICON_FILE_SCRIPT,
                    ICON_LABS,
                    ICON_HELP,
                    ICON_PLAY
                ], false));

            // windows

            reg.addExtension(
                new colibri.ui.ide.WindowExtension(
                    () => new ui.MainWindow()
                )
            );

            // editor

            reg.addExtension(new colibri.ui.ide.EditorExtension([
                ui.editors.PhaserFileEditor.getFactory(),
                ui.editors.JSDocEntryEditor.getFactory(),
                ui.editors.ExampleEditor.getFactory(),
                ui.editors.ExampleFolderEditor.getFactory()
            ]));
        }

        getDocEntryKindIcon(kind: string) {

            return this.getIcon(DOC_ENTRY_KIND_ICON_NAME[kind]);
        }

        openFirstWindow() {

            colibri.Platform.getWorkbench().activateWindow(ui.MainWindow.ID);
        }

        runExample(example: phaser.core.ExampleInfo) {

            if (example.getData().type === "file") {

                window.open(phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/view.html?src=src/" + example.getPath()));

            } else {

                window.open(phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/index.html?dir=" + example.getPath()));
            }
        }

        runExampleInPhaserWebsite(example: phaser.core.ExampleInfo) {

            const url = phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(example);

            window.open(url);
        }

        openPhaserFileEditor(docEntry: phaser.core.DocEntry) {

            const file = docEntry.getFile();

            const editor = colibri.Platform.getWorkbench().openEditor(file);

            if (editor) {

                const phaserEditor = editor as ui.editors.PhaserFileEditor;

                const entry = docEntry.getRawEntry();

                phaserEditor.scrollToLine(entry.meta.lineno + entry.meta.commentLines, entry.meta.columnno);
            }
        }
    }

    colibri.Platform.addPlugin(MainPlugin.getInstance());

    export const VER = "1.0.0"

    document.title = "Unofficial Phaser Help v" + VER + " - Phaser Editor 2D";

    console.log("Phaser Editor 2D - Unofficial Phaser Help - v" + VER);

    document.getElementById("splash-container").remove();

    async function main() {

        colibri.ui.controls.dialogs.AlertDialog.replaceConsoleAlert();

        await colibri.Platform.start();

        await MainPlugin.getInstance().openFirstWindow();
    }

    window.addEventListener("load", main);
}