namespace helpcenter.main {

    import controls = colibri.ui.controls;

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
                .withPluginFiles(this, [ICON_FILE_SCRIPT], true));

            // themes

            reg.addExtension(new colibri.ui.ide.themes.ThemeExtension({
                dark: false,
                id: "lightBlue",
                classList: ["lightBlue"],
                displayName: "Light Blue",
                viewerForeground: controls.Controls.LIGHT_THEME.viewerForeground,
                viewerSelectionForeground: controls.Controls.LIGHT_THEME.viewerSelectionForeground,
                viewerSelectionBackground: controls.Controls.LIGHT_THEME.viewerSelectionBackground,
            }));

            // windows

            reg.addExtension(
                new colibri.ui.ide.WindowExtension(
                    () => new ui.MainWindow()
                )
            );

            // editor input

            reg.addExtension(new phaser.core.PhaserFileEditorInputExtension());
            reg.addExtension(new phaser.core.JSDocEntryEditorInputExtension());

            // editor

            reg.addExtension(new colibri.ui.ide.EditorExtension([ui.editors.PhaserFileEditor.getFactory()]));
            reg.addExtension(new colibri.ui.ide.EditorExtension([ui.editors.JSDocEntryEditor.getFactory()]));
        }

        getDocEntryKindIcon(kind: string) {

            return this.getIcon(DOC_ENTRY_KIND_ICON_NAME[kind]);
        }

        openFirstWindow() {

            colibri.Platform.getWorkbench().activateWindow(ui.MainWindow.ID);
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

    console.log("Phaser Editor 2D - Help Center")

    document.getElementById("splash-container").remove();

    async function main() {

        colibri.ui.controls.dialogs.AlertDialog.replaceConsoleAlert();

        await colibri.Platform.start();

        await MainPlugin.getInstance().openFirstWindow();
    }

    window.addEventListener("load", main);
}