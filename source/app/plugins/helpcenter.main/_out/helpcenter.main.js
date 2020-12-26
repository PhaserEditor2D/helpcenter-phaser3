var helpcenter;
(function (helpcenter) {
    var main;
    (function (main_1) {
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
                    .withPluginFiles(this, helpcenter.phaser.DOC_ENTRY_KIND_LIST.map(kind => main_1.DOC_ENTRY_KIND_ICON_NAME[kind])));
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
                    this._filesView = new ui.views.files.FilesView();
                    this._namespaceView = new ui.views.namespaces.NamespaceView();
                    this._split1 = new controls.SplitPanel(this.createViewFolder(this._namespaceView, this._filesView), this._editorArea);
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
            var viewers;
            (function (viewers) {
                var controls = colibri.ui.controls;
                class PhaserCellRendererProvider {
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
                viewers.PhaserCellRendererProvider = PhaserCellRendererProvider;
            })(viewers = ui.viewers || (ui.viewers = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var viewers;
            (function (viewers) {
                class PhaserLabelProvider {
                    getLabel(obj) {
                        if (obj instanceof helpcenter.phaser.core.PhaserFile) {
                            return obj.getName();
                        }
                        if (obj instanceof helpcenter.phaser.core.DocEntry) {
                            return obj.getRawEntry().name;
                        }
                        return "";
                    }
                }
                viewers.PhaserLabelProvider = PhaserLabelProvider;
            })(viewers = ui.viewers || (ui.viewers = {}));
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
                var files;
                (function (files) {
                    var controls = colibri.ui.controls;
                    class FilesView extends colibri.ui.ide.ViewerView {
                        constructor() {
                            super(FilesView.ID);
                            this.setTitle("Files");
                            this.setIcon(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                        }
                        createViewer() {
                            const viewer = new controls.viewers.TreeViewer(this.getId());
                            viewer.setContentProvider(new FolderContentViewer());
                            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
                            viewer.setLabelProvider(new ui.viewers.PhaserLabelProvider());
                            viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getDocsFolder());
                            return viewer;
                        }
                    }
                    FilesView.ID = "helpcenter.main.ui.views.files.NavigatorView";
                    files.FilesView = FilesView;
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
                                return parent.getDocsEntries().filter(entry => entry.isFileRootElement());
                            }
                            if (parent instanceof helpcenter.phaser.core.DocEntry) {
                                return parent.getChildren();
                            }
                            return [];
                        }
                    }
                })(files = views.files || (views.files = {}));
            })(views = ui.views || (ui.views = {}));
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
                var namespaces;
                (function (namespaces) {
                    var controls = colibri.ui.controls;
                    class NamespaceView extends colibri.ui.ide.ViewerView {
                        constructor() {
                            super(NamespaceView.ID);
                            this.setTitle("Namespace");
                            this.setIcon(main.MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
                        }
                        createViewer() {
                            const viewer = new controls.viewers.TreeViewer(this.getId());
                            viewer.setContentProvider(new NamespaceContentViewer());
                            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
                            viewer.setLabelProvider(new ui.viewers.PhaserLabelProvider());
                            viewer.setInput([]);
                            return viewer;
                        }
                    }
                    NamespaceView.ID = "helpcenter.main.ui.views.classes.NamespaceView";
                    namespaces.NamespaceView = NamespaceView;
                    class NamespaceContentViewer {
                        getRoots(input) {
                            return [helpcenter.phaser.PhaserPlugin.getInstance().getDocEntry("Phaser")];
                        }
                        getChildren(parent) {
                            if (parent instanceof helpcenter.phaser.core.DocEntry) {
                                return parent.getChildren();
                            }
                            return [];
                        }
                    }
                })(namespaces = views.namespaces || (views.namespaces = {}));
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
