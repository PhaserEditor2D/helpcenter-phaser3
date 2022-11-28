namespace helpcenter.main {

    export declare type IElectronMessage = { method: string, body?: any };

    export interface IElectron {

        sendMessage(msg: IElectronMessage): void;

        sendMessageSync(msg: IElectronMessage): any;
    }

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
    export const ICON_TIME = "time";

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
                    ICON_PLAY,
                    ICON_TIME
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

        playExample(example: phaser.core.ExampleInfo) {

            const dlg = new ui.dialogs.PlayDialog(example);
            dlg.create();
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

        onElectron(yesCallback: (electron: IElectron) => void, noCallback?: () => {}) {

            const electron = window["electron"] as IElectron;

            if (electron) {

                yesCallback(electron);

            } else if (noCallback) {

                noCallback();
            }
        }
    }

    export let VER: string;

    async function initVersion() {

        VER = await (await fetch("./ver")).text();

        helpcenter.phaser.PHASER_VER = await (await fetch("./phaserVersion")).text();

        colibri.CACHE_VERSION = VER;

        colibri.Platform.addPlugin(MainPlugin.getInstance());

        document.title = `Unofficial Phaser Help Center v${VER} - Phaser v${phaser.PHASER_VER} - Phaser Editor 2D`;

        console.log("Phaser Editor 2D - Unofficial Phaser Help - v" + VER);
    }

    async function registerServiceWorker() {

        if ("serviceWorker" in navigator) {

            try {

                navigator.serviceWorker.register("./sw.js").then(() => {

                    console.log("Service worker registered");
                }, () => {

                    console.log("Cannot install service worker.");
                });

                const channel = new BroadcastChannel('sw-messages');
                channel.addEventListener('message', event => {

                    if (event.data.method === "update-available") {

                        alert(`A new version ${event.data.ver} is available. Please, refresh the page.`);
                    }
                });

            } catch (e) {

                console.log(e);
            }
        }
    }


    async function main() {

        // disable file access layer
        colibri.CAPABILITY_FILE_STORAGE = false;

        await initVersion();

        if (window.location.search === "?dev") {

            console.log("Development mode activated.");

        } else {

            registerServiceWorker();
        }

        colibri.ui.controls.dialogs.AlertDialog.replaceConsoleAlert();

        await colibri.Platform.start();

        initElectron();

        await MainPlugin.getInstance().openFirstWindow();
    }

    window.addEventListener("load", main);
}

function initElectron() {

    helpcenter.main.MainPlugin.getInstance().onElectron(e => {

        (window as any).open = (url: string) => {

            e.sendMessage({
                method: "open-url",
                body: { url }
            });
        };

        const { url } = e.sendMessageSync({ method: "get-phaser-labs-url" });

        if (url) {

            helpcenter.phaser.DEFAULT_PHASER_LABS_URL = url;
        }
    });
}