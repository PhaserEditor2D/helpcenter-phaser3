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
        main_1.ICON_LABS = "experimental";
        main_1.ICON_HELP = "help";
        main_1.ICON_PLAY = "play";
        main_1.ICON_TIME = "time";
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
                    .withPluginFiles(this, [
                    main_1.ICON_FILE_SCRIPT,
                    main_1.ICON_LABS,
                    main_1.ICON_HELP,
                    main_1.ICON_PLAY,
                    main_1.ICON_TIME
                ], false));
                // windows
                reg.addExtension(new colibri.ui.ide.WindowExtension(() => new main_1.ui.MainWindow()));
                // editor
                reg.addExtension(new colibri.ui.ide.EditorExtension([
                    main_1.ui.editors.PhaserFileEditor.getFactory(),
                    main_1.ui.editors.JSDocEntryEditor.getFactory(),
                    main_1.ui.editors.ExampleEditor.getFactory(),
                    main_1.ui.editors.ExampleFolderEditor.getFactory()
                ]));
            }
            getDocEntryKindIcon(kind) {
                return this.getIcon(main_1.DOC_ENTRY_KIND_ICON_NAME[kind]);
            }
            openFirstWindow() {
                colibri.Platform.getWorkbench().activateWindow(main_1.ui.MainWindow.ID);
            }
            playExample(example) {
                const dlg = new main_1.ui.dialogs.PlayDialog(example);
                dlg.create();
            }
            openPhaserFileEditor(docEntry) {
                const file = docEntry.getFile();
                const editor = colibri.Platform.getWorkbench().openEditor(file);
                if (editor) {
                    const phaserEditor = editor;
                    const entry = docEntry.getRawEntry();
                    phaserEditor.scrollToLine(entry.meta.lineno + entry.meta.commentLines, entry.meta.columnno);
                }
            }
        }
        main_1.MainPlugin = MainPlugin;
        async function initVersion() {
            main_1.VER = await (await fetch("/ver")).text();
            colibri.CACHE_VERSION = main_1.VER;
            colibri.Platform.addPlugin(MainPlugin.getInstance());
            document.title = `Unofficial Phaser Help Center v${main_1.VER} - Phaser v${helpcenter.phaser.PHASER_VER} - Phaser Editor 2D`;
            console.log("Phaser Editor 2D - Unofficial Phaser Help - v" + main_1.VER);
        }
        async function registerServiceWorker() {
            if ("serviceWorker" in navigator) {
                try {
                    navigator.serviceWorker.register("/sw.js").then(() => {
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
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        async function main() {
            await initVersion();
            if (window.location.search === "?dev") {
                console.log("Development mode activated.");
            }
            else {
                registerServiceWorker();
            }
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
        var core;
        (function (core) {
            var controls = colibri.ui.controls;
            class HtmlJSDocBuilder {
                constructor(docEntry) {
                    this._docEntry = docEntry;
                    this._labelProvider = new main.ui.viewers.PhaserStyledLabelProvider();
                }
                build(element) {
                    let html = "";
                    html += this.renderSignature();
                    html += this.renderExtends();
                    html += this.renderDescription();
                    html += this.renderSince();
                    html += this.renderReturns();
                    html += this.renderFires();
                    html += this.renderFunctionParams();
                    html += this.renderSubtypes();
                    html += this.renderMembers();
                    html = `<div class='jsdocArea'>${html}</div>`;
                    element.innerHTML = html;
                    const iconDivList = element.querySelectorAll(".IconDiv");
                    iconDivList.forEach((div) => {
                        const iconName = div.getAttribute("icon-name");
                        const iconControl = new controls.IconControl(main.MainPlugin.getInstance().getIcon(iconName));
                        div.appendChild(iconControl.getCanvas());
                    });
                    const links = element.querySelectorAll("a");
                    links.forEach((link) => {
                        if (link.classList.contains("LinkToApi")) {
                            link.addEventListener("click", e => {
                                const name = link.getAttribute("apiName");
                                console.log("Click on " + name);
                                const entry = helpcenter.phaser.PhaserPlugin.getInstance().getDocEntry(name);
                                console.log(entry);
                                if (entry) {
                                    colibri.Platform.getWorkbench().openEditor(entry);
                                }
                            });
                        }
                        else {
                            link.setAttribute("target", "_blank");
                        }
                    });
                }
                renderMembers() {
                    let all = "";
                    {
                        let html = "";
                        for (const child of this._docEntry.getChildren().filter(c => !c.isInherited())) {
                            html += this.renderMemberIcon(child);
                            html += this.renderLinkToApi(child.getFullName(), false) + "<br>";
                        }
                        if (html.length > 0) {
                            html = "<p><b>Members:</b></p>" + html;
                        }
                        all += html;
                    }
                    {
                        let html = "";
                        for (const child of this._docEntry.getChildren().filter(c => c.isInherited())) {
                            html += this.renderMemberIcon(child);
                            html += this.renderLinkToApi(child.getFullName(), false) + "<br>";
                        }
                        if (html.length > 0) {
                            html = "<p><b>Inherited:</b></p>" + html;
                        }
                        all += html;
                    }
                    return all;
                }
                renderMemberIcon(child, rowContent) {
                    const icon = main.MainPlugin.getInstance().getDocEntryKindIcon(child.getKind());
                    const html = `<span class='IconDiv' icon-name='${icon.getName()}' style='margin-right:5px'></span>`;
                    if (rowContent) {
                        return `<div style='display:flex'>${html}${rowContent}</div>`;
                    }
                    return html;
                }
                renderReturns() {
                    let html = "";
                    const vars = this._docEntry.getRawEntry().returns || [];
                    if (vars.length > 0) {
                        html += "<p><b>Returns:</b></p>";
                        for (const variable of vars) {
                            html += " {" + variable.type.names.map(name => this.renderLinkToApi(name)).join("|") + "}";
                            if (variable.description) {
                                html += `<dd>${helpcenter.showdown.markdownToHtml(variable.description)}</dd>`;
                            }
                        }
                    }
                    return html;
                }
                renderExtends() {
                    const types = this._docEntry.getRawEntry().augments || [];
                    if (types.length > 0) {
                        let html = " <small><span class='hljs-keyword'><b>extends</b></span></small> ";
                        html += types.map(name => "<b><small>" + this.renderLinkToApi(name) + "</small></b>").join(", ");
                        return html;
                    }
                    return "";
                }
                renderSubtypes() {
                    const types = helpcenter.phaser.PhaserPlugin.getInstance().findSubtypes(this._docEntry.getFullName());
                    if (types.length > 0) {
                        return "<p><b>Subtypes:</b></p> <p>" + types.map(t => this.renderLinkToApi(t) + "<br>").join("") + "</p>";
                    }
                    return "";
                }
                renderSince() {
                    const since = this._docEntry.getRawEntry().since;
                    return since ? `<p><b>Since:</b> ${since}</p>` : "";
                }
                renderFires() {
                    const fires = this._docEntry.getRawEntry().fires;
                    let html = "";
                    if (fires) {
                        html += `<p><b>Fires:</b></p><p>${fires.map(event => `${this.renderLinkToApi(event)}<br>`).join("")}</p>`;
                    }
                    return html;
                }
                renderFunctionParams() {
                    let html = "";
                    const params = this._docEntry.getRawEntry().params || [];
                    if (params.length > 0) {
                        html += "<p><b>Parameters:</b></p>";
                        for (const param of params) {
                            html += `<b>${param.name}${param.optional ? "?" : ""}</b>`;
                            if (param.defaultvalue !== undefined) {
                                html += " [=" + helpcenter.showdown.javascriptToHtml(param.defaultvalue + "") + "]";
                            }
                            html += " {" + param.type.names.map(name => this.renderLinkToApi(name)).join("|") + "}";
                            html += `<dd>${helpcenter.showdown.markdownToHtml(param.description)}</dd>`;
                        }
                    }
                    return html;
                }
                renderLinkToApi(name, fullName = true) {
                    name = helpcenter.phaser.PhaserPlugin.cleanApiName(name);
                    const label = fullName ? name : name.split(".").pop();
                    return `<a href="#" apiName='${name}' class='LinkToApi'>${label}</a>`;
                }
                renderDescription() {
                    const desc = this._docEntry.getDescription();
                    const descHtml = helpcenter.showdown.markdownToHtml(desc);
                    return `<p>${descHtml}</p>`;
                }
                renderSignature() {
                    let name = this._labelProvider.getStyledTexts(this._docEntry, controls.Controls.getTheme().dark)
                        .map(s => `<span style='color:${s.color}'>${s.text}</span>`).join("");
                    if (this._docEntry.getParent()) {
                        name = this.renderLinkToApi(this._docEntry.getParent().getFullName()) + "." + name;
                    }
                    name = `<span class='hljs-keyword'>${this._docEntry.getKind()}</span> ${name}`;
                    return this.renderMemberIcon(this._docEntry, `<small><b>${name}</b></small>`);
                }
            }
            core.HtmlJSDocBuilder = HtmlJSDocBuilder;
        })(core = main.core || (main.core = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            class DocEntryMenuCreator {
                constructor(docEntry) {
                    this._docEntry = docEntry;
                }
                createMenu(menu) {
                    menu.addAction({
                        text: "Open In Source Editor",
                        icon: main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT),
                        callback: e => main.MainPlugin.getInstance().openPhaserFileEditor(this._docEntry)
                    });
                    menu.addAction({
                        text: "Open In Documentation Editor",
                        icon: main.MainPlugin.getInstance().getIcon(main.ICON_HELP),
                        callback: e => colibri.Platform.getWorkbench().openEditor(this._docEntry)
                    });
                    if (!(colibri.Platform.getWorkbench().getActivePart() instanceof ui.views.ApiView)) {
                        menu.addAction({
                            text: "Reveal In API View",
                            icon: main.MainPlugin.getInstance().getDocEntryKindIcon("namespace"),
                            callback: () => {
                                const view = colibri.Platform.getWorkbench().getActiveWindow()
                                    .getApiView();
                                view.getPartFolder().selectTabWithContent(view);
                                view.getViewer().revealAndSelect(this._docEntry);
                            }
                        });
                    }
                    if (!(colibri.Platform.getWorkbench().getActivePart() instanceof ui.views.FilesView)) {
                        menu.addAction({
                            text: "Reveal In Phaser Files View",
                            icon: colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER),
                            callback: () => {
                                const view = colibri.Platform.getWorkbench().getActiveWindow()
                                    .getPhaserFilesView();
                                view.getPartFolder().selectTabWithContent(view);
                                view.getViewer().revealAndSelect(this._docEntry);
                            }
                        });
                    }
                    menu.addSeparator();
                    menu.addAction({
                        text: "Open In Official Phaser Docs",
                        callback: () => {
                            const name = this._docEntry.getRawEntry().longname.replace("#event:", ".").replace("#", "-");
                            window.open("https://newdocs.phaser.io/docs/" + helpcenter.phaser.PHASER_VER + "/focus/" + name);
                        }
                    });
                }
            }
            ui.DocEntryMenuCreator = DocEntryMenuCreator;
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var controls = colibri.ui.controls;
            class ExampleMenuCreator {
                constructor(example) {
                    this._example = example;
                }
                static addToViewer(viewer) {
                    viewer.getElement().addEventListener("contextmenu", e => {
                        const element = viewer.getSelectionFirstElement();
                        if (element instanceof helpcenter.phaser.core.ExampleInfo) {
                            const menu = new controls.Menu();
                            const builder = new ExampleMenuCreator(element);
                            builder.build(menu);
                            menu.createWithEvent(e);
                        }
                    });
                }
                build(menu) {
                    const wb = colibri.Platform.getWorkbench();
                    const activePart = wb.getActivePart();
                    menu.addAction({
                        text: "Play",
                        icon: main.MainPlugin.getInstance().getIcon(main.ICON_PLAY),
                        callback: () => main.MainPlugin.getInstance().playExample(this._example)
                    });
                    if (this._example.isPlayable()) {
                        if (!(activePart instanceof ui.editors.ExampleEditor)) {
                            menu.addAction({
                                text: "Open In Source Editor",
                                icon: main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT),
                                callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                            });
                        }
                        if (!(activePart instanceof ui.editors.ExampleFolderEditor)) {
                            menu.addAction({
                                text: "Open In Examples Folder Editor",
                                callback: () => {
                                    let example = this._example;
                                    if (example.isMultiFileChild()) {
                                        example = example.getParent();
                                    }
                                    const editor = wb.openEditor(example.getParent());
                                    editor.getViewer().setSelection([example]);
                                    editor.getViewer().reveal(example);
                                }
                            });
                        }
                    }
                    else {
                        menu.addAction({
                            text: "Open In Examples Folder Editor",
                            callback: () => colibri.Platform.getWorkbench().openEditor(this._example)
                        });
                    }
                    if (!(activePart instanceof ui.views.ExamplesView)) {
                        menu.addAction({
                            text: "Reveal In Examples View",
                            icon: main.MainPlugin.getInstance().getIcon(main.ICON_LABS),
                            callback: () => {
                                const win = wb.getActiveWindow();
                                let example = this._example;
                                if (example.isMultiFileChild()) {
                                    example = example.getParent();
                                }
                                win.getExamplesView().getViewer().revealAndSelect(example);
                            }
                        });
                    }
                }
            }
            ui.ExampleMenuCreator = ExampleMenuCreator;
        })(ui = main.ui || (main.ui = {}));
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
                getApiView() {
                    return this._apiView;
                }
                getExamplesView() {
                    return this._examplesView;
                }
                getPhaserFilesView() {
                    return this._filesView;
                }
                saveWindowState() {
                    this.saveState(colibri.Platform.getWorkbench().getGlobalPreferences());
                }
                saveState(prefs) {
                    this.saveEditorsState(prefs);
                }
                restoreState(prefs) {
                    this.restoreEditors(prefs);
                }
                createParts() {
                    this._editorArea = new colibri.ui.ide.EditorArea();
                    this._filesView = new ui.views.FilesView();
                    this._versionsView = new ui.views.VersionsView();
                    this._apiView = new ui.views.ApiView();
                    this._examplesView = new ui.views.ExamplesView();
                    this._inspectorView = new colibri.inspector.ui.views.InspectorView();
                    this._chainsView = new ui.views.ChainsView();
                    this._exampleChainsView = new ui.views.ExamplesSearchView();
                    const editorChains = new controls.SplitPanel(this._editorArea, this.createViewFolder(this._chainsView, this._exampleChainsView), false);
                    editorChains.setSplitFactor(0.5);
                    const splitLeftTopDown = new controls.SplitPanel(this.createViewFolder(this._apiView, this._filesView, this._versionsView), this.createViewFolder(this._examplesView), false);
                    const splitLeftAndEditorArea = new controls.SplitPanel(splitLeftTopDown, editorChains);
                    splitLeftAndEditorArea.setSplitFactor(0.3);
                    const splitAllLeftAndInspector = new controls.SplitPanel(splitLeftAndEditorArea, this.createViewFolder(this._inspectorView));
                    splitAllLeftAndInspector.setSplitFactor(0.8);
                    this.getClientArea().add(splitAllLeftAndInspector);
                    this.initToolbar();
                    this.layout();
                    this.initStateEvents();
                }
                initStateEvents() {
                    this.restoreState(colibri.Platform.getWorkbench().getGlobalPreferences());
                    colibri.Platform.getWorkbench().eventPartActivated.addListener(() => {
                        this.saveWindowState();
                    });
                    window.addEventListener("beforeunload", e => {
                        this.saveWindowState();
                    });
                }
                initToolbar() {
                    const toolbar = this.getToolbar();
                    {
                        // right area
                        const area = toolbar.getRightArea();
                        const manager = new controls.ToolbarManager(area);
                        manager.addAction({
                            text: "Start",
                            icon: colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_MENU),
                            showText: false,
                            callback: e => {
                                const menu = new controls.Menu();
                                menu.addAction({
                                    text: "Official Phaser Help",
                                    callback: () => window.open("https://newdocs.phaser.io")
                                });
                                menu.addAction({
                                    text: "Official Phaser Examples",
                                    callback: () => window.open("https://phaser.io/examples")
                                });
                                menu.addAction({
                                    text: "Phaser Website",
                                    callback: () => window.open("https://phaser.io")
                                });
                                menu.addSeparator();
                                menu.addAction({
                                    text: "Light",
                                    selected: !controls.Controls.getTheme().dark,
                                    callback: () => {
                                        controls.Controls.setTheme(controls.Controls.LIGHT_THEME);
                                    }
                                });
                                menu.addAction({
                                    text: "Dark",
                                    selected: controls.Controls.getTheme().dark,
                                    callback: () => {
                                        controls.Controls.setTheme(controls.Controls.DARK_THEME);
                                    }
                                });
                                menu.addSeparator();
                                menu.addAction({
                                    text: "Settings",
                                    callback: () => new ui.dialogs.SettingsDialog().create()
                                });
                                menu.addSeparator();
                                menu.addAction({
                                    text: "Help",
                                    callback: () => window.open("https://github.com/PhaserEditor2D/helpcenter-phaser3")
                                });
                                menu.addAction({
                                    text: "About",
                                    callback: () => {
                                        new ui.dialogs.AboutDialog().create();
                                    }
                                });
                                menu.createWithEvent(e);
                            }
                        });
                    }
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
            ui.LIGHT_SYNTAX_COLOR = {
                keyword: "blue",
                built_in: "darkBlue",
                literal: "blue",
                number: "brown",
                string: "darkGreen",
                title: "darkCyan",
                attr: "olive",
                comment: "green",
                methodSignature: "brown",
                returnTypeSignature: "darkCyan",
                typeSignature: "darkCyan"
            };
            ui.DARK_SYNTAX_COLOR = {
                keyword: "lightsalmon",
                built_in: "salmon",
                literal: "green",
                number: "cadetblue",
                string: "chartreuse",
                title: "cyan",
                attr: "olive",
                comment: "cornsilk",
                methodSignature: "lightGreen",
                returnTypeSignature: "cyan",
                typeSignature: "cyan"
            };
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var dialogs;
            (function (dialogs) {
                var controls = colibri.ui.controls;
                class AboutDialog extends controls.dialogs.Dialog {
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
                <small><b>v${main.VER} - Phaser ${helpcenter.phaser.PHASER_VER}</small></b>
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
                dialogs.AboutDialog = AboutDialog;
            })(dialogs = ui.dialogs || (ui.dialogs = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var dialogs;
            (function (dialogs) {
                var controls = colibri.ui.controls;
                class PlayDialog extends controls.dialogs.Dialog {
                    constructor(example) {
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
                        const url = helpcenter.phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "mobile");
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
                            const url = helpcenter.phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "view");
                            window.open(url);
                        }).style.float = "left";
                        this.addButton("Open In Sandbox", () => {
                            const url = helpcenter.phaser.PhaserPlugin.getInstance().getPhaserLabsPlayExampleUrl(this._example, "edit");
                            window.open(url);
                        }).style.float = "left";
                    }
                }
                dialogs.PlayDialog = PlayDialog;
            })(dialogs = ui.dialogs || (ui.dialogs = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var dialogs;
            (function (dialogs) {
                var controls = colibri.ui.controls;
                class SettingsDialog extends controls.dialogs.Dialog {
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
                            text.value = helpcenter.phaser.PhaserPlugin.getInstance().getPhaserLabsUrl();
                            this._phaserLabsUrlText = text;
                        }
                        this.getElement().appendChild(clientArea);
                    }
                    create() {
                        super.create();
                        this.setTitle("Settings");
                        this.addButton("Apply", () => {
                            const url = this._phaserLabsUrlText.value;
                            helpcenter.phaser.PhaserPlugin.getInstance().setPhaserLabsUrl(url);
                            this.close();
                        });
                        this.addCancelButton();
                    }
                }
                dialogs.SettingsDialog = SettingsDialog;
            })(dialogs = ui.dialogs || (ui.dialogs = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var editors;
            (function (editors) {
                var controls = colibri.ui.controls;
                class BaseJSEditor extends colibri.ui.ide.EditorPart {
                    createPart() {
                        this._codeEditor = CodeMirror(this.getElement(), {
                            mode: "javascript",
                            readOnly: true,
                            lineNumbers: true,
                        });
                        this.updateEditorWithTheme();
                        this.updateContent();
                        this._themeListener = () => this.updateEditorWithTheme();
                        colibri.Platform.getWorkbench().eventThemeChanged.addListener(this._themeListener);
                        this._codeEditor.getWrapperElement().addEventListener("contextmenu", e => {
                            const menu = new controls.Menu();
                            this.fillContextMenu(menu);
                            if (!menu.isEmpty()) {
                                menu.createWithEvent(e);
                            }
                        });
                        requestAnimationFrame(() => this.layout());
                    }
                    fillContextMenu(menu) {
                        // nothing
                    }
                    getCodeEditor() {
                        return this._codeEditor;
                    }
                    onPartClosed() {
                        const result = super.onPartClosed();
                        if (result) {
                            colibri.Platform.getWorkbench().eventThemeChanged.removeListener(this._themeListener);
                        }
                        return result;
                    }
                    updateEditorWithTheme() {
                        const theme = controls.Controls.getTheme();
                        this._codeEditor.setOption("theme", theme.dark ? "darcula" : "default");
                    }
                    scrollToLine(line, ch) {
                        this._scrollTo = { line, ch };
                        if (this._codeEditor) {
                            this.doScrollToLine();
                        }
                    }
                    doScrollToLine() {
                        if (this._scrollTo) {
                            this._codeEditor.scrollIntoView({
                                line: this._scrollTo.line,
                                ch: this._scrollTo.ch
                            }, this.getElement().getBoundingClientRect().height / 2);
                            this._codeEditor.setSelection({
                                line: this._scrollTo.line - 1,
                                ch: 0,
                            }, {
                                line: this._scrollTo.line,
                                ch: 0,
                            });
                            this._scrollTo = null;
                        }
                    }
                    layout() {
                        super.layout();
                        if (this._codeEditor) {
                            const element = this._codeEditor.getWrapperElement();
                            const b = this.getElement().getBoundingClientRect();
                            element.style.width = b.width + "px";
                            element.style.height = b.height + "px";
                            this._codeEditor.refresh();
                        }
                    }
                    updateContent() {
                        const input = this.getInput();
                        let source = "";
                        if (input) {
                            source = this.getInputContent();
                        }
                        if (this._codeEditor) {
                            this._codeEditor.setValue(source || "");
                            this.doScrollToLine();
                        }
                    }
                }
                editors.BaseJSEditor = BaseJSEditor;
            })(editors = ui.editors || (ui.editors = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class ExampleInfoSection extends controls.properties.PropertySection {
                    constructor(page, id = "helpcenter.main.ui.properties.ExampleInfoSection") {
                        super(page, id, "Example Info", false, false);
                    }
                    createForm(parent) {
                        const comp = this.createGridElement(parent, 3);
                        comp.style.gridTemplateColumns = "auto 1fr auto";
                        {
                            // File Path
                            this.createLabel(comp, "File Path", "Relative path in the Phaser repository.");
                            const text = this.createText(comp, true);
                            this.addUpdater(() => {
                                text.value = this.getSelectionFirstElement().example.getPath();
                            });
                            this.createButton(comp, "Open", () => {
                                colibri.Platform.getWorkbench().openEditor(this.getSelectionFirstElement().example);
                            });
                        }
                        {
                            // Play here
                            const btn = this.createButton(comp, "Play", () => {
                                main.MainPlugin.getInstance().playExample(this.getSelectionFirstElement().example);
                            });
                            btn.style.gridColumn = "1 / span 3";
                        }
                    }
                    canEdit(obj, n) {
                        return obj instanceof helpcenter.phaser.core.ExampleChain || obj instanceof helpcenter.phaser.core.ExampleInfo;
                    }
                    canEditNumber(n) {
                        return n === 1;
                    }
                }
                properties.ExampleInfoSection = ExampleInfoSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./BaseJSEditor.ts" />
/// <reference path="../properties/ExampleInfoSection.ts" />
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var editors;
            (function (editors) {
                var controls = colibri.ui.controls;
                class ExampleEditorFactory {
                    acceptInput(input) {
                        return input instanceof helpcenter.phaser.core.ExampleInfo && input.isPlayable();
                    }
                    createEditor() {
                        return new ExampleEditor();
                    }
                    getName() {
                        return "Example Editor";
                    }
                }
                class ExampleEditor extends editors.BaseJSEditor {
                    constructor() {
                        super(ExampleEditor.ID, ExampleEditor.getFactory());
                        this._propertyProvider = new ExampleEditorPropertyProvider();
                    }
                    static getFactory() {
                        return this._factory || (this._factory = new ExampleEditorFactory());
                    }
                    getPropertyProvider() {
                        return this._propertyProvider;
                    }
                    getInputContent() {
                        const input = this.getInput();
                        if (input.isMultiFile()) {
                            const src = input.getChildren()
                                .filter(c => !c.getPath().endsWith("boot.json"))
                                .map(c => "//\n// Example: " + c.getPath() + "\n//\n\n"
                                + c.getSource() + "\n")
                                .join("");
                            return src;
                        }
                        return input.getSource();
                    }
                    setInput(input) {
                        super.setInput(input);
                        this.setTitle(input.getName());
                        const icon = helpcenter.phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(input);
                        this.setIcon(icon || main.MainPlugin.getInstance().getIcon(main.ICON_LABS));
                    }
                    getInput() {
                        return super.getInput();
                    }
                    fillContextMenu(menu) {
                        new ui.ExampleMenuCreator(this.getInput().example).build(menu);
                    }
                    createPart() {
                        super.createPart();
                        this.setSelection([this.getInput().example]);
                    }
                    createEditorToolbar(parent) {
                        const manager = new controls.ToolbarManager(parent);
                        manager.addAction({
                            text: "Play",
                            icon: main.MainPlugin.getInstance().getIcon(main.ICON_PLAY),
                            callback: () => {
                                main.MainPlugin.getInstance().playExample(this.getInput().example);
                            }
                        });
                        return manager;
                    }
                }
                ExampleEditor.ID = "helpcenter.main.ui.editors.ExampleEditor";
                editors.ExampleEditor = ExampleEditor;
                class ExampleEditorPropertyProvider extends controls.properties.PropertySectionProvider {
                    addSections(page, sections) {
                        sections.push(new ui.properties.ExampleInfoSection(page), new ui.properties.ExampleImageSection(page));
                    }
                }
            })(editors = ui.editors || (ui.editors = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var editors;
            (function (editors) {
                var controls = colibri.ui.controls;
                class ExampleFolderEditorFactory {
                    acceptInput(input) {
                        return input instanceof helpcenter.phaser.core.ExampleInfo && input.getData().type === "directory";
                    }
                    createEditor() {
                        return new ExampleFolderEditor();
                    }
                    getName() {
                        return "Example Category Editor";
                    }
                }
                class ExampleFolderEditor extends colibri.ui.ide.EditorPart {
                    constructor() {
                        super("helpcenter.main.ui.editors.ExampleFolderEditor", ExampleFolderEditor.getFactory());
                    }
                    static getFactory() {
                        return this._factory ? this._factory : (this._factory = new ExampleFolderEditorFactory());
                    }
                    createViewer() {
                        const viewer = new controls.viewers.TreeViewer(this.getId());
                        viewer.setLabelProvider(new ExampleFolderLabelProvider());
                        viewer.setContentProvider(new ExampleFolderContentProvider([]));
                        viewer.setCellRendererProvider(new ui.viewers.ExampleCellRendererProvider());
                        this._gridRenderer = new controls.viewers.GridTreeViewerRenderer(viewer);
                        viewer.setTreeRenderer(this._gridRenderer);
                        viewer.setInput([]);
                        return viewer;
                    }
                    getPropertyProvider() {
                        return this._propertyProvider ? this._propertyProvider : (this._propertyProvider = new ui.properties.ExampleSectionProvider());
                    }
                    createPart() {
                        this._viewer = this.createViewer();
                        this.addClass("ViewerPart");
                        this._filteredViewer = this.createFilteredViewer(this._viewer);
                        this.add(this._filteredViewer);
                        this._viewer.eventSelectionChanged.addListener(sel => {
                            this.setSelection(sel);
                        });
                        this._filteredViewer.setMenuProvider(new controls.viewers.DefaultViewerMenuProvider((viewer, menu) => {
                            this.fillContextMenu(menu);
                        }));
                        this._viewer.eventOpenItem.addListener(e => {
                            const example = this._viewer.getSelectionFirstElement();
                            if (example) {
                                main.MainPlugin.getInstance().playExample(example);
                            }
                        });
                        this.updateContent();
                    }
                    createFilteredViewer(viewer) {
                        return new controls.viewers.FilteredViewer(viewer, true);
                    }
                    fillContextMenu(menu) {
                        const example = this._viewer.getSelectionFirstElement();
                        if (example) {
                            new ui.ExampleMenuCreator(example).build(menu);
                        }
                    }
                    createEditorToolbar(parent) {
                        const toolbar = new controls.ToolbarManager(parent);
                        toolbar.addAction({
                            text: "Play",
                            icon: main.MainPlugin.getInstance().getIcon(main.ICON_PLAY),
                            callback: () => {
                                const example = this.getViewer().getSelectionFirstElement();
                                if (example) {
                                    main.MainPlugin.getInstance().playExample(example);
                                }
                            }
                        });
                        toolbar.addAction({
                            text: "Source",
                            icon: main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT),
                            callback: () => {
                                const example = this.getViewer().getSelectionFirstElement();
                                if (example) {
                                    colibri.Platform.getWorkbench().openEditor(example);
                                }
                            }
                        });
                        return toolbar;
                    }
                    getViewer() {
                        return this._viewer;
                    }
                    layout() {
                        if (this._filteredViewer) {
                            this._filteredViewer.layout();
                        }
                    }
                    setInput(input) {
                        super.setInput(input);
                        this.updateContent();
                    }
                    getInput() {
                        return super.getInput();
                    }
                    updateContent() {
                        const input = this.getInput();
                        if (input) {
                            const examples = [];
                            this.getAllExamples(input, examples);
                            let images = examples
                                .map(e => helpcenter.phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(e))
                                .filter(e => e !== undefined);
                            if (images.length > 0) {
                                images = [
                                    images[0],
                                    images[Math.floor(images.length * 0.25)],
                                    images[Math.floor(images.length * 0.75)],
                                    images[Math.floor(images.length - 1)]
                                ];
                            }
                            this.setIcon(new controls.MultiImage(images, 128, 128));
                            this.setTitle(input.getName());
                            if (this._viewer) {
                                const sections = [];
                                this.buildSections(input, sections);
                                this._gridRenderer.setSectionCriteria(s => sections.indexOf(s) >= 0);
                                this._viewer.setContentProvider(new ExampleFolderContentProvider(examples));
                                this._viewer.setInput([]);
                            }
                        }
                    }
                    buildSections(input, sections) {
                        sections.push(input.getPath());
                        for (const child of input.getChildren()) {
                            if (child.getChildren().length > 0) {
                                this.buildSections(child, sections);
                            }
                        }
                    }
                    getAllExamples(example, list) {
                        if (example.isPlayable()) {
                            list.push(example);
                        }
                        else {
                            for (const child of example.getChildren()) {
                                this.getAllExamples(child, list);
                            }
                        }
                    }
                }
                editors.ExampleFolderEditor = ExampleFolderEditor;
                class ExampleFolderLabelProvider extends controls.viewers.LabelProvider {
                    getLabel(obj) {
                        if (obj instanceof helpcenter.phaser.core.ExampleInfo) {
                            return obj.getName();
                        }
                        return obj
                            .split("/")
                            .join(" / ")
                            .split(" ")
                            .map(n => n.substring(0, 1).toUpperCase() + n.substring(1))
                            .join(" ");
                    }
                }
                class ExampleFolderContentProvider {
                    constructor(examples) {
                        this._examples = examples;
                    }
                    getRoots(input) {
                        return this._examples;
                    }
                    getChildren(parent) {
                        if (parent instanceof helpcenter.phaser.core.ExampleInfo) {
                            return [];
                        }
                        const path = parent;
                        return this._examples.filter(e => e.getParent().getPath() === path);
                    }
                }
            })(editors = ui.editors || (ui.editors = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var editors;
            (function (editors) {
                var controls = colibri.ui.controls;
                class JSDocEntryEditorFactory {
                    acceptInput(input) {
                        return input instanceof helpcenter.phaser.core.DocEntry;
                    }
                    createEditor() {
                        return new JSDocEntryEditor();
                    }
                    getName() {
                        return "JSDoc Editor";
                    }
                }
                class JSDocEntryEditor extends colibri.ui.ide.EditorPart {
                    constructor() {
                        super("helpcenter.main.ui.editors.JSDocEntryEditor", JSDocEntryEditor.getFactory());
                        this.setIcon(main.MainPlugin.getInstance().getIcon(main.ICON_HELP));
                    }
                    static getFactory() {
                        return this._factory || (this._factory = new JSDocEntryEditorFactory());
                    }
                    createPart() {
                        this._contentElement = document.createElement("div");
                        this._contentElement.classList.add("JSDocEntryEditorArea");
                        this.getElement().appendChild(this._contentElement);
                        this.updateContent();
                        this._themeListener = () => this.updateContent();
                        colibri.Platform.getWorkbench().eventThemeChanged.addListener(this._themeListener);
                        requestAnimationFrame(() => this.layout());
                        this._contentElement.addEventListener("contextmenu", e => {
                            const menu = new controls.Menu();
                            new ui.DocEntryMenuCreator(this.getInput()).createMenu(menu);
                            menu.createWithEvent(e);
                        });
                    }
                    onPartClosed() {
                        const result = super.onPartClosed();
                        if (result) {
                            colibri.Platform.getWorkbench().eventThemeChanged.removeListener(this._themeListener);
                        }
                        return result;
                    }
                    layout() {
                        super.layout();
                        if (this._contentElement) {
                            const b = this.getElement().getBoundingClientRect();
                            this._contentElement.style.width = b.width + "px";
                            this._contentElement.style.height = b.height + "px";
                        }
                    }
                    getInput() {
                        return super.getInput();
                    }
                    setInput(entry) {
                        super.setInput(entry);
                        this.setTitle(entry.getName() + (entry.getParent() ? " - " + entry.getParent().getFullName() : ""));
                    }
                    updateContent() {
                        const entry = this.getInput();
                        if (entry) {
                            const builder = new main.core.HtmlJSDocBuilder(entry);
                            builder.build(this._contentElement);
                            this.setTitle(entry.getName() + (entry.getParent() ? " - " + entry.getParent().getFullName() : ""));
                        }
                        else {
                            this._contentElement.innerHTML = "";
                            this.setTitle("JSDocEditor");
                        }
                    }
                }
                editors.JSDocEntryEditor = JSDocEntryEditor;
            })(editors = ui.editors || (ui.editors = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./BaseJSEditor.ts" />
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var editors;
            (function (editors) {
                class PhaserFileEditorFactory {
                    acceptInput(input) {
                        return input instanceof helpcenter.phaser.core.PhaserFile && input.isFile();
                    }
                    createEditor() {
                        return new PhaserFileEditor();
                    }
                    getName() {
                        return "Phaser File Editor";
                    }
                }
                class PhaserFileEditor extends editors.BaseJSEditor {
                    constructor() {
                        super(PhaserFileEditor.ID, PhaserFileEditor.getFactory());
                        this.setIcon(main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT));
                    }
                    static getFactory() {
                        return this._factory || (this._factory = new PhaserFileEditorFactory());
                    }
                    getInputContent() {
                        return helpcenter.phaser.PhaserPlugin.getInstance().getPhaserFileSource(this.getInput());
                    }
                    setInput(input) {
                        super.setInput(input);
                        this.setTitle(input.getName());
                    }
                    getInput() {
                        return super.getInput();
                    }
                }
                PhaserFileEditor.ID = "helpcenter.main.ui.editors.PhaserFileEditor";
                editors.PhaserFileEditor = PhaserFileEditor;
            })(editors = ui.editors || (ui.editors = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class AbstractFileSection extends controls.properties.PropertySection {
                    createForm(parent) {
                        const comp = this.createGridElement(parent, 2);
                        // filename
                        {
                            this.createLabel(comp, "File Name");
                            const text = this.createText(comp, true);
                            this.addUpdater(() => {
                                text.value = this.getFileInfo().filename;
                            });
                        }
                        // path
                        {
                            this.createLabel(comp, "Path");
                            const text = this.createText(comp, true);
                            this.addUpdater(() => {
                                text.value = this.getFileInfo().path;
                            });
                        }
                    }
                    canEditNumber(n) {
                        return n === 1;
                    }
                }
                properties.AbstractFileSection = AbstractFileSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class DescriptionSection extends controls.properties.PropertySection {
                    constructor(page) {
                        super(page, "helpcenter.main.ui.properties.DescriptionPropertySection", "Description", true, false);
                    }
                    createForm(parent) {
                        parent.style.padding = "5px";
                        this.addUpdater(() => {
                            const builder = new main.core.HtmlJSDocBuilder(this.getDocEntry());
                            builder.build(parent);
                        });
                    }
                    hasMenu() {
                        return true;
                    }
                    createMenu(menu) {
                        new ui.DocEntryMenuCreator(this.getDocEntry()).createMenu(menu);
                    }
                    getDocEntry() {
                        return helpcenter.phaser.core.DocEntry.getDocEntry(this.getSelectionFirstElement());
                    }
                    canEdit(obj, n) {
                        return helpcenter.phaser.core.DocEntry.canAdapt(obj);
                    }
                    canEditNumber(n) {
                        return n === 1;
                    }
                }
                properties.DescriptionSection = DescriptionSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./AbstractFileSection.ts" />
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                class DocEntryFileSection extends properties.AbstractFileSection {
                    constructor(page) {
                        super(page, "helpcenter.main.ui.properties.DocEntryFileSection", "File", false, false);
                    }
                    getFileInfo() {
                        return helpcenter.phaser.core.DocEntry.getDocEntry(this.getSelectionFirstElement()).getRawEntry().meta;
                    }
                    canEdit(obj, n) {
                        return helpcenter.phaser.core.DocEntry.canAdapt(obj);
                    }
                }
                properties.DocEntryFileSection = DocEntryFileSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                class ExampleImageSection extends colibri.ui.ide.properties.BaseImagePreviewSection {
                    constructor(page) {
                        super(page, "helpcenter.main.ui.properties.ExampleImageSection", "Example Image", true, false);
                    }
                    getSelectedImage() {
                        return helpcenter.phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(this.getExample());
                    }
                    createForm(parent) {
                        super.createForm(parent);
                        parent.style.minHeight = "200px";
                    }
                    getExample() {
                        const obj = this.getSelectionFirstElement();
                        return obj instanceof helpcenter.phaser.core.ExampleChain ? obj.example : obj;
                    }
                    canEdit(obj, n) {
                        if (obj instanceof helpcenter.phaser.core.ExampleInfo || obj instanceof helpcenter.phaser.core.ExampleChain) {
                            const img = this.getSelectedImage();
                            return img !== null && img !== undefined;
                        }
                        return false;
                    }
                }
                properties.ExampleImageSection = ExampleImageSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class ExampleSectionProvider extends controls.properties.PropertySectionProvider {
                    addSections(page, sections) {
                        sections.push(new properties.ExampleInfoSection(page), new properties.ExampleSourceSection(page), new properties.ExampleImageSection(page));
                    }
                    getEmptySelectionObject() {
                        return null;
                    }
                    getEmptySelectionArray() {
                        return [];
                    }
                }
                properties.ExampleSectionProvider = ExampleSectionProvider;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class ExampleSourceSection extends controls.properties.PropertySection {
                    constructor(page) {
                        super(page, "helpcenter.main.ui.properties.ExampleSourceSection", "Example Code", false, false);
                    }
                    createForm(parent) {
                        parent.classList.add("UserSelectText");
                        parent.style.rowGap = "5px";
                        const comp = document.createElement("pre");
                        comp.classList.add("SmallScrollBar");
                        comp.style.whiteSpace = "pre";
                        comp.style.fontFamily = "monospace";
                        comp.style.overflow = "auto";
                        comp.style.maxHeight = Math.floor(window.innerHeight / 4) + "px";
                        comp.style.margin = "5px";
                        parent.appendChild(comp);
                        this.addUpdater(() => {
                            const obj = this.getSelectionFirstElement();
                            const html = helpcenter.showdown.javascriptToHtml(obj.example.getSource());
                            let html2 = html;
                            let scrollToId;
                            if (obj instanceof helpcenter.phaser.core.ExampleChain) {
                                const showLine = obj.lineNumber;
                                const bgColor = "rgba(0, 0, 255, 0.2)";
                                scrollToId = "line#" + obj.example.getPath() + "#" + showLine;
                                html2 = "";
                                const lines = html.split("\n");
                                let n = 1;
                                let width = 0;
                                const plainLines = obj.example.getSource().split("\n");
                                for (const line of plainLines) {
                                    width = Math.max(width, line.length);
                                }
                                for (const line of lines) {
                                    if (n === showLine) {
                                        const pad = " ".repeat(width - plainLines[n - 1].length);
                                        html2 += `<div id='${scrollToId}' class='MarkCodeLine'>${line}${pad}</div>\n`;
                                    }
                                    else {
                                        html2 += `${line}\n`;
                                    }
                                    n++;
                                }
                            }
                            comp.innerHTML = html2;
                            if (scrollToId) {
                                const elem = document.getElementById(scrollToId);
                                elem.scrollIntoView();
                            }
                        });
                    }
                    canEdit(obj, n) {
                        return obj instanceof helpcenter.phaser.core.ExampleChain
                            || obj instanceof helpcenter.phaser.core.ExampleInfo && obj.getData().type === "file";
                    }
                    canEditNumber(n) {
                        return n === 1;
                    }
                }
                properties.ExampleSourceSection = ExampleSourceSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./AbstractFileSection.ts" />
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                class FileSection extends properties.AbstractFileSection {
                    constructor(page) {
                        super(page, "helpcenter.main.ui.properties.FileSection", "File", false, false);
                    }
                    getFileInfo() {
                        const file = this.getSelectionFirstElement();
                        return { filename: file.getName(), path: (file.getParent() ? file.getParent().getPath() : "") };
                    }
                    canEdit(obj, n) {
                        return obj instanceof helpcenter.phaser.core.PhaserFile;
                    }
                }
                properties.FileSection = FileSection;
            })(properties = ui.properties || (ui.properties = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var properties;
            (function (properties) {
                var controls = colibri.ui.controls;
                class PhaserSectionProvider extends controls.properties.PropertySectionProvider {
                    addSections(page, sections) {
                        sections.push(new properties.DocEntryFileSection(page), new properties.FileSection(page), new properties.DescriptionSection(page));
                    }
                }
                properties.PhaserSectionProvider = PhaserSectionProvider;
            })(properties = ui.properties || (ui.properties = {}));
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
                class ExampleCellRendererProvider {
                    getCellRenderer(element) {
                        const img = helpcenter.phaser.PhaserPlugin.getInstance().getExampleImageReader().getImage(element);
                        if (img) {
                            return new controls.viewers.ImageCellRenderer(img);
                        }
                        if (element.getData().type === "file") {
                            return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getIcon(main.ICON_LABS));
                        }
                        return new controls.viewers.IconImageCellRenderer(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                    }
                    async preload(args) {
                        return controls.PreloadResult.NOTHING_LOADED;
                    }
                }
                viewers.ExampleCellRendererProvider = ExampleCellRendererProvider;
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
                class ExampleContentProvider {
                    getRoots(input) {
                        return helpcenter.phaser.PhaserPlugin.getInstance().getExamples();
                    }
                    getChildren(parent) {
                        if (parent.isMultiFile()) {
                            return [];
                        }
                        return parent.getChildren();
                    }
                }
                viewers.ExampleContentProvider = ExampleContentProvider;
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
                class ExampleLabelProvider {
                    getLabel(obj) {
                        return obj.getName();
                    }
                }
                viewers.ExampleLabelProvider = ExampleLabelProvider;
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
                var controls = colibri.ui.controls;
                class PhaserCellRendererProvider {
                    getCellRenderer(element) {
                        if (typeof element === "string") {
                            return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getIcon(main.ICON_TIME));
                        }
                        if (element instanceof helpcenter.phaser.core.PhaserFile) {
                            if (element.isFolder()) {
                                return new controls.viewers.IconImageCellRenderer(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                            }
                        }
                        if (element instanceof helpcenter.phaser.core.DocEntry) {
                            return PhaserCellRendererProvider.getDocEntryCellRenderer(element);
                        }
                        return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getIcon(main.ICON_FILE_SCRIPT));
                    }
                    static getDocEntryCellRenderer(docEntry) {
                        const kind = docEntry.getRawEntry().kind;
                        return new controls.viewers.IconImageCellRenderer(main.MainPlugin.getInstance().getDocEntryKindIcon(kind));
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
                        if (typeof obj === "string") {
                            return obj;
                        }
                        if (obj instanceof helpcenter.phaser.core.PhaserFile) {
                            return obj.getName();
                        }
                        if (obj instanceof helpcenter.phaser.core.DocEntry) {
                            return obj.getName() + obj.getMethodSignature()
                                + obj.getReturnsTypeSignature() + obj.getTypeSignature();
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
            var viewers;
            (function (viewers) {
                var controls = colibri.ui.controls;
                class PhaserStyledLabelProvider {
                    constructor(showFullName = false) {
                        this._showFullName = showFullName;
                        this._labelProvider = new viewers.PhaserLabelProvider();
                    }
                    getStyledTexts(obj, dark) {
                        const theme = controls.Controls.getTheme();
                        const styles = dark ? ui.DARK_SYNTAX_COLOR : ui.LIGHT_SYNTAX_COLOR;
                        if (obj instanceof helpcenter.phaser.core.DocEntry) {
                            return [{
                                    color: theme.viewerForeground + (obj.isInherited() ? "a0" : ""),
                                    text: this._showFullName ? obj.getFullName() : obj.getName()
                                }, {
                                    color: styles.methodSignature,
                                    text: obj.getMethodSignature()
                                }, {
                                    color: styles.returnTypeSignature,
                                    text: obj.getReturnsTypeSignature()
                                }, {
                                    color: styles.typeSignature,
                                    text: obj.getTypeSignature()
                                }];
                        }
                        return [{
                                color: theme.viewerForeground,
                                text: this._labelProvider.getLabel(obj)
                            }];
                    }
                }
                viewers.PhaserStyledLabelProvider = PhaserStyledLabelProvider;
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
                var controls = colibri.ui.controls;
                class AbstractExampleView extends colibri.ui.ide.ViewerView {
                    getPropertyProvider() {
                        if (!this._propertyProvider) {
                            this._propertyProvider = new ui.properties.ExampleSectionProvider();
                        }
                        return this._propertyProvider;
                    }
                    fillContextMenu(menu) {
                        const example = this.getViewer().getSelectionFirstElement();
                        if (example instanceof helpcenter.phaser.core.ExampleInfo) {
                            new ui.ExampleMenuCreator(example).build(menu);
                        }
                    }
                    createViewer() {
                        const viewer = new controls.viewers.TreeViewer(this.getId());
                        //viewer.setFilterOnRepaintDisabled();
                        //viewer.setPreloadDisabled();
                        viewer.setLabelProvider(new ui.viewers.ExampleLabelProvider());
                        viewer.setContentProvider(new ui.viewers.ExampleContentProvider());
                        viewer.setCellRendererProvider(new ui.viewers.ExampleCellRendererProvider());
                        viewer.setInput([]);
                        viewer.eventOpenItem.addListener(e => {
                            const example = viewer.getSelectionFirstElement();
                            if (example) {
                                if (example.isPlayable()) {
                                    main.MainPlugin.getInstance().playExample(example);
                                }
                                else {
                                    colibri.Platform.getWorkbench().openEditor(example);
                                }
                            }
                        });
                        return viewer;
                    }
                }
                views.AbstractExampleView = AbstractExampleView;
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
                class AbstractPhaserView extends colibri.ui.ide.ViewerView {
                    constructor() {
                        super(...arguments);
                        this._propertySectionProvider = new ui.properties.PhaserSectionProvider();
                    }
                    createPart() {
                        super.createPart();
                        const viewer = this.getViewer();
                        viewer.setFilterOnRepaintDisabled();
                        viewer.setPreloadDisabled();
                        viewer.eventOpenItem.addListener(e => {
                            const element = viewer.getSelectionFirstElement();
                            if (element) {
                                if (element instanceof helpcenter.phaser.core.PhaserFile && element.isFile()) {
                                    colibri.Platform.getWorkbench().openEditor(element);
                                }
                                else if (helpcenter.phaser.core.DocEntry.canAdapt(element)) {
                                    const docEntry = helpcenter.phaser.core.DocEntry.getDocEntry(element);
                                    main.MainPlugin.getInstance().openPhaserFileEditor(docEntry);
                                }
                            }
                        });
                    }
                    getPropertyProvider() {
                        return this._propertySectionProvider;
                    }
                    fillContextMenu(menu) {
                        super.fillContextMenu(menu);
                        const element = this.getViewer().getSelectionFirstElement();
                        if (helpcenter.phaser.core.DocEntry.canAdapt(element)) {
                            const entry = helpcenter.phaser.core.DocEntry.getDocEntry(element);
                            new ui.DocEntryMenuCreator(entry).createMenu(menu);
                        }
                    }
                }
                views.AbstractPhaserView = AbstractPhaserView;
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
                var controls = colibri.ui.controls;
                class ApiView extends views.AbstractPhaserView {
                    constructor() {
                        super(ApiView.ID, false);
                        this.setTitle("API");
                        this.setIcon(main.MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
                        const layout = window.localStorage.getItem("helper.main.ui.views.ApiView.layout");
                        this._flatLayout = !layout || layout === "flat";
                        const showInherited = window.localStorage.getItem("helper.main.ui.views.ApiView.showInherited");
                        this._showInherited = !showInherited || showInherited === "true";
                    }
                    createViewer() {
                        const viewer = new controls.viewers.TreeViewer(this.getId());
                        viewer.setFilterOnRepaintDisabled();
                        viewer.setPreloadDisabled();
                        viewer.setContentProvider(new ApiContentProvider(this._showInherited, this._flatLayout));
                        viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
                        viewer.setStyledLabelProvider(new StyledLabelProvider(this._flatLayout));
                        viewer.setInput([]);
                        return viewer;
                    }
                    fillContextMenu(menu) {
                        menu.addAction({
                            text: "Flat Layout",
                            selected: this._flatLayout,
                            callback: () => {
                                this._flatLayout = true;
                                window.localStorage.setItem("helper.main.ui.views.ApiView.layout", "flat");
                                this.updateViewer();
                            }
                        });
                        menu.addAction({
                            text: "Tree Layout",
                            selected: !this._flatLayout,
                            callback: () => {
                                this._flatLayout = false;
                                window.localStorage.setItem("helper.main.ui.views.ApiView.layout", "tree");
                                this.updateViewer();
                            }
                        });
                        menu.addSeparator();
                        menu.addAction({
                            text: "Show Inherited Members",
                            selected: this._showInherited,
                            callback: () => {
                                this._showInherited = !this._showInherited;
                                window.localStorage.setItem("helper.main.ui.views.ApiView.showInherited", this._showInherited + "");
                                this.updateViewer();
                            }
                        });
                        super.fillContextMenu(menu);
                    }
                    onPartAdded() {
                        super.onPartAdded();
                        const folder = this.getPartFolder();
                        const label = folder.getLabelFromContent(this);
                        folder.addTabSection(label, "Type");
                        folder.addTabSection(label, "Constant");
                        folder.addTabSection(label, "Event");
                        folder.eventTabSectionSelected.addListener(section => {
                            this._section = section;
                            this.updateViewer();
                        });
                    }
                    updateViewer() {
                        const sel = this._viewer.getSelection();
                        this._viewer.setContentProvider(new ApiContentProvider(this._showInherited, this._flatLayout, this._section));
                        this._viewer.setLabelProvider(null);
                        this._viewer.setStyledLabelProvider(new StyledLabelProvider(this._flatLayout));
                        this._viewer.setScrollY(0);
                        if (this._viewer.getFilterText().trim().length > 0) {
                            this._viewer.setFilterText(this._viewer.getFilterText());
                        }
                        this._viewer.revealAndSelect(...sel);
                    }
                }
                ApiView.ID = "helpcenter.main.ui.views.classes.NamespaceView";
                views.ApiView = ApiView;
                class StyledLabelProvider extends ui.viewers.PhaserStyledLabelProvider {
                    constructor(flat) {
                        super();
                        this.flat = flat;
                    }
                    getStyledTexts(obj, dark) {
                        if (this.flat) {
                            const theme = controls.Controls.getTheme();
                            if (obj instanceof helpcenter.phaser.core.DocEntry && obj.isNamespace()) {
                                return [{
                                        color: theme.viewerForeground,
                                        text: obj.getFullName()
                                    }];
                            }
                        }
                        return super.getStyledTexts(obj, dark);
                    }
                }
                class ApiContentProvider {
                    constructor(showInherited, flat, section) {
                        this._flat = flat;
                        this._section = section;
                        this._showInherited = showInherited;
                    }
                    setSection(section) {
                        this._section = section;
                    }
                    getRoots(input) {
                        if (this._flat) {
                            let result = helpcenter.phaser.PhaserPlugin.getInstance().getFlatNamespaces();
                            if (this._section) {
                                result = result.filter(c => {
                                    return this.getChildren(c).length > 0;
                                });
                            }
                            return result;
                        }
                        return [helpcenter.phaser.PhaserPlugin.getInstance().getPhaserDocEntry()];
                    }
                    getChildren(parent) {
                        if (parent instanceof helpcenter.phaser.core.DocEntry) {
                            let result = parent.getChildren();
                            if (!this._showInherited) {
                                result = result.filter(c => !c.isInherited());
                            }
                            switch (this._section) {
                                case "Type":
                                    result = result.filter(c => {
                                        const k = c.getKind();
                                        return k === "class" || k === "typedef" || c.isNamespace();
                                    });
                                    break;
                                case "Event":
                                    result = result.filter(c => c.getKind() === "event" || c.isNamespace());
                                    break;
                                case "Constant":
                                    result = result.filter(c => c.getKind() === "constant" || c.isNamespace());
                                    break;
                            }
                            if (this._section) {
                                result = result.filter(c => {
                                    return !c.isNamespace() || this.getChildren(c).length > 0;
                                });
                            }
                            if (this._flat) {
                                result = result.filter(c => !c.isNamespace());
                            }
                            return result;
                        }
                        return [];
                    }
                }
                views.ApiContentProvider = ApiContentProvider;
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
                var controls = colibri.ui.controls;
                class ChainsView extends views.AbstractPhaserView {
                    constructor() {
                        super(ChainsView.ID, false);
                        this.setTitle("API Chains");
                        this.setIcon(main.MainPlugin.getInstance().getDocEntryKindIcon("namespace"));
                    }
                    createViewer() {
                        this._model = new ChainsModel();
                        this._model.build();
                        const viewer = new ChainsViewer(this._model);
                        viewer.setPreloadDisabled();
                        viewer.setFilterOnRepaintDisabled();
                        viewer.setCellRendererProvider(new ChainsCellRendererProvider());
                        viewer.setLabelProvider(new ChainsLabelProvider());
                        viewer.setStyledLabelProvider(new ChainsStyledLabelProvider());
                        viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());
                        viewer.setTreeRenderer(new ChainsTreeRenderer(viewer));
                        viewer.setInput(this._model.getChains());
                        return viewer;
                    }
                }
                ChainsView.ID = "helpcenter.main.ui.views.classes.ChainsView";
                views.ChainsView = ChainsView;
                class ChainsSearchEngine extends controls.viewers.MultiWordSearchEngine {
                    prepare(pattern) {
                        if (pattern.startsWith("this")) {
                            pattern = "Phaser.Scene" + pattern.substring(4);
                        }
                        super.prepare(pattern);
                    }
                }
                class ChainsViewer extends controls.viewers.TreeViewer {
                    constructor(model) {
                        super(ChainsView.ID + ".viewer");
                        this._model = model;
                        this.setSearchEngine(new ChainsSearchEngine());
                    }
                    setFilterText(text) {
                        controls.viewers.Viewer.prototype.setFilterText.call(this, text);
                        let chains = [];
                        if (text.trim().length > 0) {
                            this.getSearchEngine().prepare(text);
                            chains = this._model.getChains().filter(c => this.matches(c));
                        }
                        else {
                            chains = this._model.getChains();
                        }
                        this.setInput(chains);
                        this.setScrollY(0);
                    }
                    isFilterIncluded(obj) {
                        return true;
                    }
                }
                class ChainsTreeRenderer extends controls.viewers.TreeViewerRenderer {
                    prepareContextForText(args) {
                        super.prepareContextForText(args);
                        args.canvasContext.font = controls.FONT_HEIGHT + "px Monospace";
                    }
                }
                class ChainsStyledLabelProvider {
                    constructor() {
                        this._labelProvider = new ChainsLabelProvider();
                    }
                    getStyledTexts(obj, dark) {
                        if (obj instanceof Chain) {
                            return dark ? obj.darkStyledLabel : obj.lightStyledLabel;
                        }
                        return [{
                                text: this._labelProvider.getLabel(obj),
                                color: controls.Controls.getTheme().viewerForeground
                            }];
                    }
                }
                class ChainsLabelProvider {
                    getLabel(obj) {
                        if (obj instanceof Chain) {
                            return obj.label;
                        }
                        return "";
                    }
                }
                class ChainsCellRendererProvider {
                    getCellRenderer(element) {
                        if (element instanceof Chain) {
                            return ui.viewers.PhaserCellRendererProvider.getDocEntryCellRenderer(element.docEntry);
                        }
                        return controls.viewers.EmptyCellRenderer.instance;
                    }
                    async preload(args) {
                        return controls.PreloadResult.NOTHING_LOADED;
                    }
                }
                class Chain {
                    adaptToDocEntry() {
                        return this.docEntry;
                    }
                }
                class ChainsModel {
                    build() {
                        this._chains = [];
                        const root = helpcenter.phaser.PhaserPlugin.getInstance().getDocEntry("Phaser");
                        this.buildAll(root, "Phaser", 1);
                        this._chains.sort((a, b) => {
                            const aa = a.countDots * (a.chained ? 2 : 1);
                            const bb = b.countDots * (b.chained ? 2 : 1);
                            return aa - bb;
                        });
                    }
                    getChains() {
                        return this._chains;
                    }
                    buildAll(parent, parentLabel, depth) {
                        if (depth < 0) {
                            return;
                        }
                        for (const child of parent.getChildren()) {
                            // if (child.isInherited()) {
                            //     continue;
                            // }
                            const entryFullName = parentLabel + "." + child.getName();
                            if (child.getKind() === "namespace") {
                                this.buildAll(child, entryFullName, depth);
                            }
                            else {
                                const chain = new Chain();
                                chain.chained = depth !== 1;
                                const baseLabel = entryFullName
                                    + child.getTypeSignature()
                                    + child.getMethodSignature()
                                    + child.getReturnsTypeSignature();
                                const tags = [];
                                const classMember = ["member", "function"].indexOf(child.getKind()) >= 0;
                                if (classMember) {
                                    tags.push(child.isInherited() ? "#i" : "#d");
                                }
                                tags.push(chain.chained ? "#c" : "#u");
                                const since = child.getRawEntry().since;
                                const version = since ? " v" + since : "";
                                const tagsLabel = tags.join(" ");
                                chain.label = child.getKind() + " " + baseLabel + " " + tagsLabel + version;
                                chain.countDots = chain.label.split("").filter(c => c === ".").length;
                                chain.lightStyledLabel = [{
                                        text: child.getKind() + " ",
                                        color: ui.LIGHT_SYNTAX_COLOR.keyword
                                    }, {
                                        text: entryFullName,
                                        color: controls.Controls.LIGHT_THEME.viewerForeground + (chain.chained ? "a0" : "")
                                    },
                                    {
                                        text: child.getTypeSignature(),
                                        color: ui.LIGHT_SYNTAX_COLOR.typeSignature
                                    }, {
                                        text: child.getMethodSignature(),
                                        color: ui.LIGHT_SYNTAX_COLOR.methodSignature
                                    }, {
                                        text: child.getReturnsTypeSignature(),
                                        color: ui.LIGHT_SYNTAX_COLOR.returnTypeSignature
                                    }, {
                                        text: " " + tagsLabel,
                                        color: "cadetBlue"
                                    }, {
                                        text: version,
                                        color: "gray"
                                    }];
                                chain.darkStyledLabel = [{
                                        text: child.getKind() + " ",
                                        color: ui.DARK_SYNTAX_COLOR.keyword
                                    }, {
                                        text: entryFullName,
                                        color: controls.Controls.DARK_THEME.viewerForeground + (chain.chained ? "a0" : "")
                                    },
                                    {
                                        text: child.getTypeSignature(),
                                        color: ui.DARK_SYNTAX_COLOR.typeSignature
                                    }, {
                                        text: child.getMethodSignature(),
                                        color: ui.DARK_SYNTAX_COLOR.methodSignature
                                    }, {
                                        text: child.getReturnsTypeSignature(),
                                        color: ui.DARK_SYNTAX_COLOR.returnTypeSignature
                                    }, {
                                        text: " " + tagsLabel,
                                        color: "bisque"
                                    }, {
                                        text: version,
                                        color: "gray"
                                    }];
                                chain.lightStyledLabel = chain.lightStyledLabel.filter(s => s.text.length > 0);
                                chain.darkStyledLabel = chain.darkStyledLabel.filter(s => s.text.length > 0);
                                chain.docEntry = child;
                                this._chains.push(chain);
                                this.buildAll(child, baseLabel, depth);
                                const type = child.getType();
                                if (type) {
                                    for (const name of type.names) {
                                        if (name === "Phaser.Scene" || name === "Phaser.Game" || name === "Phaser.GameObjects.GameObject") {
                                            continue;
                                        }
                                        const typeEntry = helpcenter.phaser.PhaserPlugin.getInstance().getDocEntry(name);
                                        if (typeEntry) {
                                            this.buildAll(typeEntry, entryFullName, depth - 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
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
                var controls = colibri.ui.controls;
                class ExamplesSearchView extends colibri.ui.ide.ViewerView {
                    constructor() {
                        super(ExamplesSearchView.ID);
                        this.setTitle("Examples Code");
                        this.setIcon(main.MainPlugin.getInstance().getIcon(main.ICON_LABS));
                        this._propertyProvider = new ui.properties.ExampleSectionProvider();
                    }
                    fillContextMenu(menu) {
                        const chain = this.getViewer().getSelectionFirstElement();
                        if (chain) {
                            new ui.ExampleMenuCreator(chain.example).build(menu);
                        }
                    }
                    createViewer() {
                        const viewer = new ExampleChainsViewer();
                        viewer.setPreloadDisabled();
                        viewer.setFilterOnRepaintDisabled();
                        viewer.setLabelProvider(new ExampleChainLabelProvider());
                        viewer.setStyledLabelProvider(new ExampleChainStyledLabelProvider());
                        viewer.setContentProvider(new controls.viewers.ArrayTreeContentProvider());
                        viewer.setCellRendererProvider(new ExampleChainCellRendererProvider());
                        viewer.setTreeRenderer(new ExampleChainTreeRenderer(viewer));
                        viewer.setCellSize(32, true);
                        viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getExampleChains());
                        viewer.eventOpenItem.addListener((chain) => {
                            const editor = colibri.Platform.getWorkbench().openEditor(chain.example);
                            editor.scrollToLine(chain.lineNumber, 0);
                        });
                        return viewer;
                    }
                    getPropertyProvider() {
                        return this._propertyProvider;
                    }
                }
                ExamplesSearchView.ID = "helpcenter.main.ui.views.examples.ExamplesSearchView";
                views.ExamplesSearchView = ExamplesSearchView;
                class ExampleChainsViewer extends controls.viewers.TreeViewer {
                    constructor() {
                        super(ExamplesSearchView.ID + ".viewer");
                    }
                    setFilterText(text) {
                        let chains = helpcenter.phaser.PhaserPlugin.getInstance().getExampleChains();
                        controls.viewers.Viewer.prototype.setFilterText.call(this, text);
                        if (text.trim().length > 0) {
                            this.getSearchEngine().prepare(text);
                            chains = chains.filter(c => this.matches(c));
                        }
                        this.setInput(chains);
                        this.setScrollY(0);
                    }
                    isFilterIncluded(obj) {
                        return true;
                    }
                }
                class ExampleChainCellRendererProvider {
                    constructor() {
                        this._provider = new ui.viewers.ExampleCellRendererProvider();
                    }
                    getCellRenderer(obj) {
                        return this._provider.getCellRenderer(obj.example);
                    }
                    async preload(args) {
                        return controls.PreloadResult.NOTHING_LOADED;
                    }
                }
                views.ExampleChainCellRendererProvider = ExampleChainCellRendererProvider;
                class ExampleChainStyledLabelProvider {
                    getStyledTexts(obj, dark) {
                        const tokens = helpcenter.showdown.javascriptToTokens(obj.line);
                        const styles = dark ? ui.DARK_SYNTAX_COLOR : ui.LIGHT_SYNTAX_COLOR;
                        const theme = controls.Controls.getTheme();
                        const codeStyles = tokens.map(token => {
                            return {
                                text: token.value,
                                color: styles[token.kind] || theme.viewerForeground
                            };
                        });
                        return [...codeStyles, {
                                text: " " + obj.example.getPath(),
                                color: dark ? "gray" : "gray"
                            }];
                    }
                }
                const EXAMPLE_CHAIN_FONT = controls.FONT_HEIGHT + "px Monospace";
                class ExampleChainTreeRenderer extends controls.viewers.TreeViewerRenderer {
                    prepareContextForText(args) {
                        super.prepareContextForText(args);
                        args.canvasContext.font = EXAMPLE_CHAIN_FONT;
                    }
                }
                class ExampleChainLabelProvider {
                    getLabel(obj) {
                        return obj.line + " " + obj.example.getPath();
                    }
                }
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./AbstractExampleView.ts"/>
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var views;
            (function (views) {
                class ExamplesView extends views.AbstractExampleView {
                    constructor() {
                        super("helpcenter.main.ui.views.examples.ExamplesView");
                        this.setTitle("Examples");
                        this.setIcon(main.MainPlugin.getInstance().getIcon(main.ICON_LABS));
                    }
                }
                views.ExamplesView = ExamplesView;
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./AbstractPhaserView.ts"/>
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var views;
            (function (views) {
                var controls = colibri.ui.controls;
                class FilesView extends views.AbstractPhaserView {
                    constructor() {
                        super(FilesView.ID, false);
                        this.setTitle("Phaser Files");
                        this.setIcon(colibri.ColibriPlugin.getInstance().getIcon(colibri.ICON_FOLDER));
                    }
                    createViewer() {
                        const viewer = new controls.viewers.TreeViewer(this.getId());
                        viewer.setContentProvider(new FolderContentViewer());
                        viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
                        viewer.setLabelProvider(new ui.viewers.PhaserLabelProvider());
                        viewer.setStyledLabelProvider(new ui.viewers.PhaserStyledLabelProvider());
                        viewer.setInput(helpcenter.phaser.PhaserPlugin.getInstance().getDocsFolder());
                        return viewer;
                    }
                }
                FilesView.ID = "helpcenter.main.ui.views.files.FilesView";
                views.FilesView = FilesView;
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
                            return parent.getDocEntries().filter(entry => {
                                return entry.getKind() !== "namespace"
                                    && entry.getFile() === parent
                                    && (!entry.getParent() || entry.getParent().getFile() !== parent);
                            });
                        }
                        if (parent instanceof helpcenter.phaser.core.DocEntry) {
                            // get only doc entries in the same file
                            return parent.getChildren().filter(entry => entry.getFile() === parent.getFile());
                        }
                        return [];
                    }
                }
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
/// <reference path="./AbstractPhaserView.ts"/>
var helpcenter;
(function (helpcenter) {
    var main;
    (function (main) {
        var ui;
        (function (ui) {
            var views;
            (function (views) {
                var controls = colibri.ui.controls;
                class VersionsView extends views.AbstractPhaserView {
                    constructor() {
                        super(views.FilesView.ID, false);
                        this.setTitle("Versions");
                        this.setIcon(main.MainPlugin.getInstance().getIcon(main.ICON_TIME));
                    }
                    createViewer() {
                        const set = new Set(helpcenter.phaser.PhaserPlugin.getInstance().getDocsEntries()
                            .map(e => e.getRawEntry().since)
                            .filter(since => since));
                        const versions = [...set].sort((a, b) => {
                            try {
                                return -(Number.parseInt(a.replace(".", ""), 10) - Number.parseInt(b.replace(".", ""), 10));
                            }
                            catch (e) {
                                return -a.localeCompare(b);
                            }
                        });
                        const viewer = new controls.viewers.TreeViewer(this.getId());
                        viewer.setContentProvider(new VersionsContentProvider());
                        viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
                        viewer.setStyledLabelProvider(new ui.viewers.PhaserStyledLabelProvider(true));
                        viewer.setInput(versions);
                        return viewer;
                    }
                }
                VersionsView.ID = "helpcenter.main.ui.views.files.VersionsView";
                views.VersionsView = VersionsView;
                class VersionsContentProvider extends views.ApiContentProvider {
                    constructor() {
                        super(false, true);
                    }
                    getRoots(input) {
                        return input;
                    }
                    getChildren(parent) {
                        if (typeof parent === "string") {
                            return helpcenter.phaser.PhaserPlugin.getInstance().getDocsEntries()
                                .filter(e => !e.isInherited())
                                .filter(e => e.getRawEntry().since === parent);
                        }
                        return [];
                    }
                }
            })(views = ui.views || (ui.views = {}));
        })(ui = main.ui || (main.ui = {}));
    })(main = helpcenter.main || (helpcenter.main = {}));
})(helpcenter || (helpcenter = {}));
