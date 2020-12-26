var helpcenter;
(function (helpcenter) {
    var main;
    (function (main_1) {
        main_1.DOC_ENTRY_KIND_LIST = ["member", "function", "namespace", "typedef", "class", "event", "constant"];
        main_1.DOC_ENTRY_KIND_ICON_NAME = {
            "member": "symbol-variable",
            "function": "symbol-method",
            "namespace": "symbol-namespace",
            "typedef": "symbol-interface",
            "class": "symbol-class",
            "event": "symbol-field",
            "constant": "symbol-constant"
        };
        main_1.ICON_FILE_SCRIPT = "file-script";
        class MainPlugin extends colibri.Plugin {
            constructor() {
                super("helpcenter.main");
            }
            static getInstance() {
                var _a;
                return (_a = this._instance) !== null && _a !== void 0 ? _a : (this._instance = new MainPlugin());
            }
            registerExtensions(reg) {
                // icons
                reg.addExtension(colibri.ui.ide.IconLoaderExtension
                    .withPluginFiles(this, main_1.DOC_ENTRY_KIND_LIST.map(kind => main_1.DOC_ENTRY_KIND_ICON_NAME[kind])));
                reg.addExtension(colibri.ui.ide.IconLoaderExtension
                    .withPluginFiles(this, [main_1.ICON_FILE_SCRIPT], true));
                // windows
                reg.addExtension(new colibri.ui.ide.WindowExtension(() => new main_1.ui.MainWindow()));
            }
            getDocEntryKindIcon(kind) {
                return this.getIcon(main_1.DOC_ENTRY_KIND_ICON_NAME[kind]);
            }
            openFirstWindow() {
                colibri.Platform.getWorkbench().activateWindow(main_1.ui.MainWindow.ID);
            }
        }
        main_1.MainPlugin = MainPlugin;
        colibri.Platform.addPlugin(MainPlugin.getInstance());
        main_1.VER = "1.0.0";
        console.log("Phaser Editor 2D - Help Center");
        document.getElementById("splash-container").remove();
        async function main() {
            colibri.ui.controls.dialogs.AlertDialog.replaceConsoleAlert();
            await colibri.Platform.start();
            await MainPlugin.getInstance().openFirstWindow();
        }
        window.addEventListener("load", main);
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var controls = colibri.ui.controls;
            class MainWindow extends colibri.ui.ide.WorkbenchWindow {
                constructor() {
                    super(MainWindow.ID);
                }
                createParts() {
                    this._editorArea = new colibri.ui.ide.EditorArea();
                    this._navigatorView = new ui.views.types.NavigatorView();
                    this._split1 = new controls.SplitPanel(this.createViewFolder(this._navigatorView), this._editorArea);
                    this.getClientArea().add(this._split1);
                    this._split1.setSplitFactor(0.2);
                    this.layout();
                }
                getEditorArea() {
                    return this._editorArea;
                }
            }
            MainWindow.ID = "helpcenter.main.MainWindow";
            ui.MainWindow = MainWindow;
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var views;
            (function (views) {
                var types;
                (function (types) {
                    var controls = colibri.ui.controls;
                    class NavigatorView extends colibri.ui.ide.ViewerView {
                        constructor() {
                            super(NavigatorView.ID);
                            this.setTitle("Navigator");
                        }
                        createViewer() {
                            const viewer = new controls.viewers.TreeViewer(this.getId());
                            viewer.setContentProvider(new FolderContentViewer());
                            viewer.setLabelProvider(new NavigatorLabelProvider());
                            viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getDocsFolder());
                            viewer.setCellRendererProvider(new PhaserFileRendererProvider());
                            return viewer;
                        }
                    }
                    NavigatorView.ID = "helpcenter.main.ui.views.types.NavigatorView";
                    types.NavigatorView = NavigatorView;
                    class PhaserFileRendererProvider {
                        getCellRenderer(element) {
                            if (element instanceof helpcenter.phaser.core.PhaserFile) {
                                if (element.isFolder()) {
                                    return new controls.viewers.IconImageCellRenderer(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                                }
                            }
                            if (element instanceof helpcenter.phaser.core.DocEntry) {
                                const kind = element.getRawEntry().kind;
                                return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getDocEntryKindIcon(kind));
                            }
                            return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT));
                        }
                        async preload(args) {
                            return controls.PreloadResult.NOTHING_LOADED;
                        }
                    }
                    class FolderContentViewer {
                        getRoots(input) {
                            const root = input;
                            return root.getChildren();
                        }
                        getChildren(parent) {
                            if (parent instanceof helpcenter.phaser.core.PhaserFile) {
                                if (parent.isFolder()) {
                                    return parent.getChildren();
                                }
                                return parent.getDocsEntries();
                            }
                            return [];
                        }
                    }
                    class NavigatorLabelProvider {
                        getLabel(obj) {
                            if (obj instanceof helpcenter.phaser.core.PhaserFile) {
                                return obj.getName();
                            }
                            if (obj instanceof helpcenter.phaser.core.DocEntry) {
                                return obj.getRawEntry().longname;
                            }
                            return "";
                        }
                    }
                })(types = views.types || (views.types = {}));
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
