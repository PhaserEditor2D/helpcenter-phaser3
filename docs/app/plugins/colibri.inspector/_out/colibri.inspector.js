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
                    static updateInspectorView(selection) {
                        const win = colibri.Platform.getWorkbench().getActiveWindow();
                        const view = win.getView(InspectorView.VIEW_ID);
                        if (view) {
                            view.getPropertyPage().setSelection(selection);
                        }
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
                        }
                    }
                    onPartSelection() {
                        const sel = this._currentPart.getSelection();
                        const provider = this._currentPart.getPropertyProvider();
                        this._propertyPage.setSelection(sel, false);
                        this._propertyPage.setSectionProvider(provider);
                        // Commented on Sept 28, 2022. 
                        // The page.updateWithSelection() is always called
                        // the page.setSectionProvider(provider)
                        //
                        // this._propertyPage.setSelection(sel);
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
                InspectorView.VIEW_ID = "InspectorView";
                views.InspectorView = InspectorView;
            })(views = ui.views || (ui.views = {}));
        })(ui = inspector.ui || (inspector.ui = {}));
    })(inspector = colibri.inspector || (colibri.inspector = {}));
})(colibri || (colibri = {}));
