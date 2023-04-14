var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        phaser.DEFAULT_PHASER_LABS_URL = "https://labs.phaser.io";
        phaser.DOC_ENTRY_KIND_LIST = ["namespace", "class", "typedef", "constant", "event", "member", "function"];
        class PhaserPlugin extends colibri.Plugin {
            constructor() {
                super("helpcenter.phaser");
            }
            static getInstance() {
                return this._instance ? this._instance : this._instance = new PhaserPlugin();
            }
            registerExtensions(reg) {
                // resource loaders
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    this._docsFile = await this.getJSON("data/phaser-docs.json", colibri.CACHE_VERSION);
                }));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    const data = await this.getJSON("data/phaser-code.json", colibri.CACHE_VERSION);
                    this._sourceMap = new Map();
                    // tslint:disable-next-line:forin
                    for (const key in data) {
                        this._sourceMap.set(key, data[key]);
                    }
                }));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    const data = await this.getJSON("data/phaser-examples.json", colibri.CACHE_VERSION);
                    this.addTypeToData(data);
                    this._examples = data.children.map(child => new phaser.core.ExampleInfo(null, child));
                    this._exampleMap = new Map();
                    this.buildExamplesMap(this._examples);
                    console.log(this._exampleMap);
                }));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    const data = await this.getJSON("data/phaser-examples-code.json", colibri.CACHE_VERSION);
                    // tslint:disable-next-line:forin
                    for (const path in data) {
                        const code = data[path];
                        const example = this.getExampleByPath(path);
                        if (example) {
                            example.setSource(code);
                        }
                        else {
                            console.error("Missing example for " + path);
                        }
                    }
                    this._exampleChains = [];
                    const re = /[a-zA-Z]/;
                    for (const example of this._exampleMap.values()) {
                        if (example.getData().type === "file" && example.getSource()) {
                            const lines = example.getSource().split("\n");
                            let n = 1;
                            for (const line of lines) {
                                const line2 = line.trim();
                                // TODO: just check the line has a letter
                                if (re.test(line2) && !line2.startsWith("//") && !line2.startsWith("*")) {
                                    this._exampleChains.push(new phaser.core.ExampleChain(line2, n, example));
                                }
                                n++;
                            }
                        }
                    }
                }));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    this._exampleImageReader = new phaser.ui.ExampleImageReader();
                    await this._exampleImageReader.preload();
                }));
                // editor input
                reg.addExtension(new phaser.core.PhaserFileEditorInputExtension());
                reg.addExtension(new phaser.core.JSDocEntryEditorInputExtension());
                reg.addExtension(new phaser.core.ExampleFolderEditorInputExtension());
            }
            addTypeToData(data) {
                data.type = data.path.endsWith(".js") ? "file" : "directory";
                if (data.type === "directory") {
                    data.children = data.children || [];
                    for (const child of data.children) {
                        this.addTypeToData(child);
                    }
                }
            }
            buildExamplesMap(examples) {
                for (const e of examples) {
                    this._exampleMap.set(e.getPath().toLocaleLowerCase(), e);
                    this.buildExamplesMap(e.getChildren());
                }
            }
            getPhaserLabsUrl(path) {
                let storeUrl = window.localStorage.getItem("phaser-labs-url") || phaser.DEFAULT_PHASER_LABS_URL;
                if (storeUrl && storeUrl.trim().length === 0) {
                    storeUrl = phaser.DEFAULT_PHASER_LABS_URL;
                }
                const baseUrl = storeUrl || phaser.DEFAULT_PHASER_LABS_URL;
                return baseUrl + (path || "");
            }
            setPhaserLabsUrl(url) {
                url = url.trim();
                if (url.endsWith("/")) {
                    url = url.substring(0, url.length - 2);
                }
                window.localStorage.setItem("phaser-labs-url", url);
            }
            getPhaserLabsPlayExampleUrl(example, page = "view") {
                if (example.isMultiFileChild()) {
                    example = example.getParent();
                }
                if (example.getData().type === "file") {
                    return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/" + page + ".html?src=src/" + example.getPath());
                }
                else if (example.isMultiFile()) {
                    return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/boot.html?src=src/" + example.getPath() + "/boot.json");
                }
                return phaser.PhaserPlugin.getInstance().getPhaserLabsUrl("/index.html?dir=" + example.getPath());
            }
            getExampleChains() {
                return this._exampleChains;
            }
            getExamples() {
                return this._examples;
            }
            getExampleByPath(path) {
                return this._exampleMap.get(path.toLocaleLowerCase());
            }
            getExampleImageReader() {
                return this._exampleImageReader;
            }
            getPhaserFileSource(file) {
                const filePath = file instanceof phaser.core.PhaserFile ? file.getPath() : file;
                return this._sourceMap.get(filePath);
            }
            getDocsJSONFile() {
                return this._docsFile;
            }
            getDocsFolder() {
                return this._docsFolder;
            }
            getDocsEntries() {
                return this._docEntries;
            }
            getPhaserFile(filePath) {
                const names = filePath.split("/");
                let file = this._docsFolder;
                for (const name of names) {
                    file = file.getChild(name);
                    if (!file) {
                        return null;
                    }
                }
                return file;
            }
            async started() {
                this.buildModel();
            }
            static cleanApiName(name) {
                return name.replace("#event:", "#").replace("#", ".");
            }
            buildModel() {
                const entries = this._docsFile.docs;
                entries.sort((a, b) => {
                    const aa = phaser.DOC_ENTRY_KIND_LIST.indexOf(a.kind);
                    const bb = phaser.DOC_ENTRY_KIND_LIST.indexOf(b.kind);
                    return aa - bb;
                });
                const docEntries = [];
                // build map
                this._docsNameMap = new Map();
                for (const entry of entries) {
                    const docEntry = new phaser.core.DocEntry(entry);
                    this._docsNameMap.set(entry.longname, docEntry);
                    this._docsNameMap.set(PhaserPlugin.cleanApiName(entry.longname), docEntry);
                    docEntries.push(docEntry);
                }
                // build hierarchy
                for (const entry of docEntries) {
                    const memberof = entry.getRawEntry().memberof;
                    // there are entries with scope global that are not member of any other entry
                    if (memberof) {
                        const parent = this._docsNameMap.get(memberof);
                        if (parent) {
                            parent.getChildren().push(entry);
                            entry.setParent(parent);
                        }
                    }
                }
                // sends inherited members to the end
                for (const entry of docEntries) {
                    if (entry.getKind() === "class") {
                        entry.getChildren().sort((a, b) => (a.isInherited() ? 1 : 0) - (b.isInherited() ? 1 : 0));
                    }
                }
                // build flat
                this._flatNamespaces = [];
                for (const entry of docEntries) {
                    if (entry.getKind() === "namespace" || entry.getKind() === "package") {
                        const isFlat = entry.getChildren()
                            .filter(c => !c.isNamespace())
                            .length > 0;
                        if (isFlat) {
                            this._flatNamespaces.push(entry);
                        }
                    }
                }
                this._flatNamespaces.sort((a, b) => a.getFullName().localeCompare(b.getFullName()));
                // build folders
                const root = new phaser.core.PhaserFile("", true, null);
                for (const docEntry of docEntries) {
                    const entry = docEntry.getRawEntry();
                    // if (entry.meta.filename === "phaser.js" || entry.meta.filename === "index.js") {
                    //     continue;
                    // }
                    const names = entry.meta.path.split("/");
                    let folder = root;
                    if (entry.meta.path !== entry.meta.filename) {
                        // we are in a folder
                        for (const name of names) {
                            folder = folder.getOrMakeChild(name, true, docEntry);
                        }
                    }
                    const file = folder.getOrMakeChild(entry.meta.filename, false, docEntry);
                    file.addDocEntry(docEntry);
                }
                this.sortFile(root);
                this._docsFolder = root;
                this._docEntries = docEntries;
            }
            getFlatNamespaces() {
                return this._flatNamespaces;
            }
            findSubtypes(typeName) {
                const result = [];
                for (const entry of this._docEntries) {
                    const augments = entry.getRawEntry().augments || [];
                    for (const name of augments) {
                        if (name === typeName) {
                            result.push(entry.getFullName());
                        }
                    }
                }
                return result;
            }
            sortFile(folder) {
                folder.getChildren().sort((a, b) => {
                    const aa = a.isFile() ? 1 : 0;
                    const bb = b.isFile() ? 1 : 0;
                    return aa - bb;
                });
                for (const c of folder.getChildren()) {
                    if (c.isFolder()) {
                        this.sortFile(c);
                    }
                }
            }
            getDocEntry(name) {
                return this._docsNameMap.get(name);
            }
            getPhaserDocEntry() {
                return this.getDocEntry("Phaser");
            }
        }
        phaser.PhaserPlugin = PhaserPlugin;
        colibri.Platform.addPlugin(PhaserPlugin.getInstance());
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class DocEntry {
                constructor(rawEntry) {
                    this._rawEntry = rawEntry;
                    this._children = [];
                }
                getEditorInputExtension() {
                    return core.JSDocEntryEditorInputExtension.ID;
                }
                static canAdapt(obj) {
                    return this.getDocEntry(obj) instanceof DocEntry;
                }
                static getDocEntry(obj) {
                    if (obj instanceof DocEntry) {
                        return obj;
                    }
                    if (obj && "adaptToDocEntry" in obj) {
                        const entry = obj["adaptToDocEntry"]();
                        if (entry instanceof DocEntry) {
                            return entry;
                        }
                    }
                    return null;
                }
                visit(visitor) {
                    for (const c of this.getChildren()) {
                        c.visit(visitor);
                    }
                    visitor(this);
                }
                getFile() {
                    return this._file;
                }
                setFile(file) {
                    this._file = file;
                }
                getParent() {
                    return this._parent;
                }
                setParent(parent) {
                    this._parent = parent;
                }
                getChildren() {
                    return this._children;
                }
                hasChildren() {
                    return this._children.length > 0;
                }
                getRawEntry() {
                    return this._rawEntry;
                }
                isNamespace() {
                    return this.getKind() === "namespace" || this.getKind() === "package";
                }
                isInherited() {
                    return this._rawEntry.inherited === true;
                }
                getType() {
                    return this._rawEntry.type;
                }
                getKind() {
                    return this._rawEntry.kind;
                }
                getDescription() {
                    return this._rawEntry.description || "";
                }
                getName() {
                    return this._rawEntry.name;
                }
                getFullName() {
                    return this._rawEntry.longname.replace("#", ".");
                }
                getMethodSignature() {
                    const kind = this._rawEntry.kind;
                    if (kind === "function") {
                        const params = this._rawEntry.params || [];
                        return `(${params.map(p => p.name).join(", ")})`;
                    }
                    return "";
                }
                getReturnsTypeSignature() {
                    if (this._rawEntry.returns) {
                        return ": " + this._rawEntry.returns.flatMap(r => r.type.names).join("|");
                    }
                    return "";
                }
                getTypeSignature() {
                    if (this._rawEntry.type) {
                        return ": " + this._rawEntry.type.names.join("|");
                    }
                    return "";
                }
            }
            core.DocEntry = DocEntry;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class ExampleChain {
                constructor(line, lineNumber, example) {
                    this.line = line;
                    this.lineNumber = lineNumber;
                    this.example = example;
                    this.line = this.line.replaceAll("\t", " ").substring(0, 300);
                }
            }
            core.ExampleChain = ExampleChain;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class ExampleFolderEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
                constructor() {
                    super(ExampleFolderEditorInputExtension.ID);
                }
                createEditorInput(state) {
                    return phaser.PhaserPlugin.getInstance().getExampleByPath(state.path);
                }
                getEditorInputState(input) {
                    return {
                        path: input.getPath()
                    };
                }
                getEditorInputId(input) {
                    return input.getPath();
                }
            }
            ExampleFolderEditorInputExtension.ID = "helpcenter.main.ui.editors.ExampleFolderEditorInputExtension";
            core.ExampleFolderEditorInputExtension = ExampleFolderEditorInputExtension;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class ExampleInfo {
                constructor(parent, data) {
                    this._parent = parent;
                    this._data = data;
                    this._path = data.path.replaceAll("\\", "/").substring(4);
                    {
                        let name = data.name;
                        name = data.type === "file" ? name.substring(0, name.lastIndexOf(".")) : name;
                        this._name = name.split(" ").filter(n => n.length > 0).map(w => {
                            return w[0].toUpperCase() + w.substring(1, w.length);
                        }).join(" ");
                    }
                    this._children = [];
                    if (data.type === "directory") {
                        for (const child of data.children) {
                            if (child.name.startsWith("_")) {
                                continue;
                            }
                            this._children.push(new ExampleInfo(this, child));
                        }
                    }
                    this._children.sort((a, b) => a.getData().type.localeCompare(b.getData().type));
                    const bootFile = this._children.find(c => c.getPath().endsWith("/boot.json"));
                    this._isMultiFile = bootFile !== undefined;
                }
                isPlayable() {
                    return this.getData().type === "file" || this.isMultiFile();
                }
                isMultiFile() {
                    return this._isMultiFile;
                }
                isMultiFileChild() {
                    return this.getParent() && this.getParent().isMultiFile();
                }
                get example() {
                    return this;
                }
                getEditorInputExtension() {
                    return core.ExampleFolderEditorInputExtension.ID;
                }
                getChildren() {
                    return this._children;
                }
                getSource() {
                    return this._source;
                }
                setSource(source) {
                    this._source = source;
                }
                getPath() {
                    return this._path;
                }
                getName() {
                    return this._name;
                }
                getParent() {
                    return this._parent;
                }
                getData() {
                    return this._data;
                }
            }
            core.ExampleInfo = ExampleInfo;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class JSDocEntryEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
                constructor() {
                    super(JSDocEntryEditorInputExtension.ID);
                }
                createEditorInput(state) {
                    return phaser.PhaserPlugin.getInstance().getDocEntry(state.fullName);
                }
                getEditorInputState(input) {
                    return {
                        fullName: input.getFullName()
                    };
                }
                getEditorInputId(input) {
                    return input.getFullName();
                }
            }
            JSDocEntryEditorInputExtension.ID = "helpcenter.main.ui.editors.DocEntryEditorInputExtension";
            core.JSDocEntryEditorInputExtension = JSDocEntryEditorInputExtension;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class PhaserFile {
                constructor(name, isFolder, docEntry) {
                    this._name = name;
                    this._isFolder = isFolder;
                    this._docEntry = docEntry;
                    this._docsEntries = [];
                    this._children = [];
                    this._childrenMap = new Map();
                }
                getPath() {
                    if (this._parent) {
                        const parentPath = this._parent.getPath();
                        if (parentPath === "") {
                            return this._name;
                        }
                        return parentPath + "/" + this._name;
                    }
                    return "";
                }
                getEditorInputExtension() {
                    return "helpcenter.main.ui.editors.PhaserFileEditorInputExtension";
                }
                getDocEntry() {
                    return this._docEntry;
                }
                getChild(name) {
                    return this._childrenMap.get(name);
                }
                getChildren() {
                    return this._children;
                }
                getOrMakeChild(name, isFolder, entry) {
                    let folder = this._childrenMap.get(name);
                    if (!folder) {
                        folder = new PhaserFile(name, isFolder, entry);
                        folder._parent = this;
                        this._childrenMap.set(name, folder);
                        this._children.push(folder);
                    }
                    return folder;
                }
                getParent() {
                    return this._parent;
                }
                addDocEntry(docEntry) {
                    this._docsEntries.push(docEntry);
                    docEntry.setFile(this);
                }
                getDocEntries() {
                    return this._docsEntries;
                }
                getName() {
                    return this._name;
                }
                isFolder() {
                    return this._isFolder;
                }
                isFile() {
                    return !this.isFolder();
                }
            }
            core.PhaserFile = PhaserFile;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var core;
        (function (core) {
            class PhaserFileEditorInputExtension extends colibri.ui.ide.EditorInputExtension {
                constructor() {
                    super(PhaserFileEditorInputExtension.ID);
                }
                createEditorInput(state) {
                    return phaser.PhaserPlugin.getInstance().getPhaserFile(state.filePath);
                }
                getEditorInputState(input) {
                    return {
                        filePath: input.getPath()
                    };
                }
                getEditorInputId(input) {
                    return input.getPath();
                }
            }
            PhaserFileEditorInputExtension.ID = "helpcenter.main.ui.editors.PhaserFileEditorInputExtension";
            core.PhaserFileEditorInputExtension = PhaserFileEditorInputExtension;
        })(core = phaser.core || (phaser.core = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        var ui;
        (function (ui) {
            var controls = colibri.ui.controls;
            class ExampleImageReader {
                constructor() {
                    this._textureCount = 5;
                }
                async preload() {
                    this._imageMap = new Map();
                    for (let i = 0; i < this._textureCount; i++) {
                        const texUrl = phaser.PhaserPlugin.getInstance().getResourceURL(`data/examples-screenshots-atlas/texture-${i}.webp`);
                        const texImage = controls.Controls.getImage(texUrl, texUrl, false);
                        await texImage.preload();
                        const atlasData = await phaser.PhaserPlugin.getInstance().getJSON(`data/examples-screenshots-atlas/texture-${i}.json`, colibri.CACHE_VERSION);
                        let j = 0;
                        // tslint:disable-next-line:forin
                        for (const frameName in atlasData.frames) {
                            const f = atlasData.frames[frameName].frame;
                            const fd = controls.FrameData.fromRect(0, new controls.Rect(f.x, f.y, f.w, f.h));
                            const img = new controls.ImageFrame(frameName, texImage, fd);
                            const key = frameName.replaceAll(".jpg", ".js").substring(1);
                            this._imageMap.set(key, img);
                            j++;
                        }
                    }
                }
                getImage(example) {
                    if (example.isMultiFile()) {
                        return this.getImageFromPath(example.getPath() + "/boot.js");
                    }
                    if (example.isMultiFileChild()) {
                        return this.getImage(example.getParent());
                    }
                    return this.getImageFromPath(example.getPath());
                }
                getImageFromPath(examplePath) {
                    return this._imageMap.get(examplePath);
                }
            }
            ui.ExampleImageReader = ExampleImageReader;
        })(ui = phaser.ui || (phaser.ui = {}));
    })(phaser = helpcenter.phaser || (helpcenter.phaser = {}));
})(helpcenter || (helpcenter = {}));
