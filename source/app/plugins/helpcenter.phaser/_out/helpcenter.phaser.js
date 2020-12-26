var helpcenter;
(function (helpcenter) {
    var phaser;
    (function (phaser) {
        phaser.PHASER_VER = "3.24.1";
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
                const data = await this.getJSON("data/phaser.json");
                const list = new Set();
                for (const entry of data.docs) {
                    list.add(entry.kind);
                }
                this.buildModel();
            }
            buildModel() {
                var _a;
                const entries = this._docsFile.docs;
                // build map
                this._docsNameMap = new Map();
                for (const entry of entries) {
                    this._docsNameMap.set(entry.longname, entry);
                }
                // build hierarchy
                for (const entry of entries) {
                    // there are entries with scope global that are not member of any other entry
                    if (entry.memberof) {
                        const parent = this._docsNameMap.get(entry.memberof);
                        if (parent) {
                            parent.children = (_a = parent.children) !== null && _a !== void 0 ? _a : [];
                            parent.children.push(entry);
                            entry.parent = parent;
                        }
                    }
                }
                // build folders
                const root = new phaser.core.PhaserFile("", true, null);
                const set = new Set();
                for (const entry of entries) {
                    set.add(entry.kind);
                    const names = entry.meta.path.split("/");
                    let folder = root;
                    if (entry.meta.path !== entry.meta.filename) {
                        // we are in a folder
                        for (const name of names) {
                            folder = folder.getOrMakeChild(name, true, entry);
                        }
                    }
                    const file = folder.getOrMakeChild(entry.meta.filename, false, entry);
                    file.getDocsEntries().push(new phaser.core.DocEntry(entry));
                    entry.folder = folder;
                    //folder.getDocsEntries().push(new core.DocEntry(entry));
                }
                this.sort(root);
                this._docsFolder = root;
                console.log([...set]);
            }
            sort(folder) {
                folder.getChildren().sort((a, b) => {
                    const aa = a.isFile() ? 1 : 0;
                    const bb = b.isFile() ? 1 : 0;
                    return aa - bb;
                });
                for (const c of folder.getChildren()) {
                    if (c.isFolder()) {
                        this.sort(c);
                    }
                }
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
                    this._docEntry = new core.DocEntry(docEntry);
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
