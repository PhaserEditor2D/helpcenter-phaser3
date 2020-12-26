var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        phaser.PHASER_VER = "3.24.1";
        phaser.DOC_ENTRY_KIND_LIST = ["namespace", "class", "typedef", "constant", "event", "member", "function"];
        class PhaserPlugin extends colibri.Plugin {
            constructor() {
                super("helpcenter.phaser");
            }
            static getInstance() {
                return this._instance ? this._instance : this._instance = new PhaserPlugin();
            }
            registerExtensions(reg) {
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(async () => {
                    this._docsFile = await this.getJSON("data/phaser.json");
                }));
            }
            getDocsJSONFile() {
                return this._docsFile;
            }
            getDocsFolder() {
                return this._docsFolder;
            }
            async started() {
                this.buildModel();
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
                // build folders
                const root = new phaser.core.PhaserFile("", true, null);
                for (const docEntry of docEntries) {
                    const entry = docEntry.getRawEntry();
                    if (entry.meta.filename === "phaser.js" || entry.meta.filename === "index.js") {
                        continue;
                    }
                    const names = entry.meta.path.split("/");
                    let folder = root;
                    if (entry.meta.path !== entry.meta.filename) {
                        // we are in a folder
                        for (const name of names) {
                            folder = folder.getOrMakeChild(name, true, docEntry);
                        }
                    }
                    const file = folder.getOrMakeChild(entry.meta.filename, false, docEntry);
                    file.getDocsEntries().push(docEntry);
                }
                this.sortFile(root);
                this._docsFolder = root;
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
                getParent() {
                    return this._parent;
                }
                setParent(parent) {
                    this._parent = parent;
                }
                isFileRootElement() {
                    return !this._parent || this._parent.getRawEntry().kind === "namespace";
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
            class PhaserFile {
                constructor(name, isFolder, docEntry) {
                    this._name = name;
                    this._isFolder = isFolder;
                    this._docEntry = docEntry;
                    this._docsEntries = [];
                    this._children = [];
                    this._childrenMap = new Map();
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
                getDocsEntries() {
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
