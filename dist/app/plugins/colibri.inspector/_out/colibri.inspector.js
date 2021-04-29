var colibri;
(function (colibri) {
    var inspector;
    (function (inspector) {
        var ide = colibri.ui.ide;
        inspector.ICON_INSPECTOR = "inspector";
        class InspectorPlugin extends colibri.Plugin {
            constructor() {
                super("colibri.inspector");
            }
            static getInstance() {
                return this._instance;
            }
            registerExtensions(reg) {
                reg.addExtension(ide.IconLoaderExtension.withPluginFiles(this, [
                    inspector.ICON_INSPECTOR
                ]));
            }
        }
        InspectorPlugin._instance = new InspectorPlugin();
        inspector.InspectorPlugin = InspectorPlugin;
        colibri.Platform.addPlugin(InspectorPlugin.getInstance());
    })(inspector = colibri.inspector || (colibri.inspector = {}));
})(colibri || (colibri = {}));
var colibri;
(function (colibri) {
    var inspector;
    (function (inspector) {
        var ui;
        (function (ui) {
            var views;
            (function (views) {
                var controls = colibri.ui.controls;
                var ide = colibri.ui.ide;
                class InspectorView extends ide.ViewPart {
                    constructor() {
                        super(InspectorView.VIEW_ID);
                        this.setTitle("Inspector");
                        this.setIcon(inspector.InspectorPlugin.getInstance().getIcon(inspector.ICON_INSPECTOR));
                    }
                    layout() {
                        this._propertyPage.dispatchLayoutEvent();
                    }
                    createPart() {
                        this._propertyPage = new controls.properties.PropertyPage();
                        this._propertyPage.getElement().addEventListener("scroll", e => {
                            this.layout();
                        });
                        this.add(this._propertyPage);
                        this._selectionListener = (e) => this.onPartSelection();
                        ide.Workbench.getWorkbench()
                            .eventPartActivated.addListener(() => this.onWorkbenchPartActivate());
                    }
                    onPartAdded() {
                        super.onPartAdded();
                        this.getPartFolder().eventTabSectionSelected.addListener((tabSection) => {
                            if (this._propertyPage) {
                                const provider = this._propertyPage.getSectionProvider();
                                if (provider) {
                                    provider.setSelectedTabSection(tabSection);
                                    this._propertyPage.updateWithSelection();
                                }
                            }
                        });
                    }
                    onWorkbenchPartActivate() {
                        const part = ide.Workbench.getWorkbench().getActivePart();
                        if (part instanceof ide.EditorPart && part.isEmbeddedMode()) {
                            // we don't want to link with embedded editors!
                            return;
                        }
                        if (part !== this && part !== this._currentPart) {
                            if (this._currentPart) {
                                this._currentPart.eventSelectionChanged.removeListener(this._selectionListener);
                            }
                            this._currentPart = part;
                            if (part) {
                                part.eventSelectionChanged.addListener(this._selectionListener);
                                this.onPartSelection();
                            }
                            else {
                                this._propertyPage.setSectionProvider(null);
                            }
                            this.updateUpdateTabSections();
                        }
                    }
                    onPartSelection() {
                        const sel = this._currentPart.getSelection();
                        const provider = this._currentPart.getPropertyProvider();
                        this._propertyPage.setSectionProvider(provider);
                        this._propertyPage.setSelection(sel);
                    }
                    updateUpdateTabSections() {
                        const partFolder = this.getPartFolder();
                        const tabLabel = partFolder.getLabelFromContent(this);
                        partFolder.removeAllSections(tabLabel, false);
                        if (this._currentPart) {
                            const provider = this._currentPart.getPropertyProvider();
                            if (provider) {
                                const tabSections = provider.getTabSections();
                                for (const tabSection of tabSections) {
                                    partFolder.addTabSection(tabLabel, tabSection, this.getId());
                                }
                                const selected = provider.getSelectedTabSection();
                                partFolder.selectTabSection(tabLabel, selected);
                            }
                        }
                    }
                    getUndoManager() {
                        if (this._currentPart) {
                            const manager = this._currentPart.getUndoManager();
                            if (manager) {
                                return manager;
                            }
                        }
                        return super.getUndoManager();
                    }
                    getPropertyPage() {
                        return this._propertyPage;
                    }
                }
                InspectorView.VIEW_ID = "colibri.inspector.ui.views.InspectorView";
                views.InspectorView = InspectorView;
            })(views = ui.views || (ui.views = {}));
        })(ui = inspector.ui || (inspector.ui = {}));
    })(inspector = colibri.inspector || (colibri.inspector = {}));
})(colibri || (colibri = {}));
