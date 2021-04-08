namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export class ApiView extends AbstractPhaserView {
        static ID = "helpcenter.main.ui.views.classes.NamespaceView";
        private _flatLayout: boolean;
        private _section: "Types" | "Events";

        constructor() {
            super(ApiView.ID);

            this.setTitle("API");
            this.setIcon(MainPlugin.getInstance().getDocEntryKindIcon("namespace"));

            this._flatLayout = false;
        }

        protected createViewer(): controls.viewers.TreeViewer {

            const viewer = new controls.viewers.TreeViewer(this.getId());

            viewer.setFilterOnRepaintDisabled();
            viewer.setPreloadDisabled();
            viewer.setContentProvider(new ApiContentViewer(this._flatLayout));
            viewer.setCellRendererProvider(new ui.viewers.PhaserCellRendererProvider());
            viewer.setStyledLabelProvider(new StyledLabelProvider(this._flatLayout));
            viewer.setInput([]);

            return viewer;
        }

        fillContextMenu(menu: controls.Menu) {

            menu.addAction({
                text: "Flat Layout",
                selected: this._flatLayout,
                callback: () => {

                    this._flatLayout = true;
                    this.updateViewer();
                }
            });

            menu.addAction({
                text: "Tree Layout",
                selected: !this._flatLayout,
                callback: () => {

                    this._flatLayout = false;
                    this.updateViewer();
                }
            });

            menu.addSeparator();

            super.fillContextMenu(menu);
        }

        onPartAdded() {

            super.onPartAdded();

            const folder = this.getPartFolder();

            const label = folder.getLabelFromContent(this);

            folder.addTabSection(label, "Types");
            folder.addTabSection(label, "Events");

            folder.eventTabSectionSelected.addListener(section => {

                this._section = section as any;

                this.updateViewer();
            });
        }

        updateViewer() {

            this._viewer.setContentProvider(new ApiContentViewer(this._flatLayout, this._section));
            this._viewer.setLabelProvider(null);
            this._viewer.setStyledLabelProvider(new StyledLabelProvider(this._flatLayout));
            this._viewer.setScrollY(0);

            if (this._viewer.getFilterText().trim().length > 0) {

                this._viewer.setFilterText(this._viewer.getFilterText());
            }
        }
    }

    class StyledLabelProvider extends viewers.PhaserStyledLabelProvider {

        constructor(private flat: boolean) {
            super();
        }

        getStyledTexts(obj: any, dark: boolean) {

            if (this.flat) {

                const theme = controls.Controls.getTheme();

                if (obj instanceof phaser.core.DocEntry && obj.isNamespace()) {

                    return [{
                        color: theme.viewerForeground,
                        text: obj.getFullName()
                    }]
                }
            }

            return super.getStyledTexts(obj, dark);
        }
    }

    class ApiContentViewer implements controls.viewers.ITreeContentProvider {

        private _section: "Types" | "Events";
        private _flat: boolean;

        constructor(flat: boolean, section?: "Types" | "Events") {

            this._flat = flat;
            this._section = section;
        }

        setSection(section: any) {

            this._section = section;
        }

        getRoots(input: any): any[] {

            if (this._flat) {

                let result = phaser.PhaserPlugin.getInstance().getFlatNamespaces();

                if (this._section) {

                    result = result.filter(c => {

                        return this.getChildren(c).length > 0;
                    });
                }

                return result;
            }

            return [phaser.PhaserPlugin.getInstance().getPhaserDocEntry()];
        }

        getChildren(parent: any): any[] {

            if (parent instanceof phaser.core.DocEntry) {

                let result = parent.getChildren();

                switch (this._section) {

                    case "Types":

                        result = result.filter(c => {

                            const k = c.getKind();

                            return k === "class" || k === "typedef" || c.isNamespace();
                        });

                        break;

                    case "Events":

                        result = result.filter(c => c.getKind() === "event" || c.isNamespace());

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
}