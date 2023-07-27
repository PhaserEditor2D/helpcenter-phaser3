namespace helpcenter.main.core {

    import controls = colibri.ui.controls;

    export class HtmlJSDocBuilder {

        private _docEntry: phaser.core.DocEntry;
        private _labelProvider: ui.viewers.PhaserStyledLabelProvider;

        constructor(docEntry: phaser.core.DocEntry) {

            this._docEntry = docEntry;
            this._labelProvider = new main.ui.viewers.PhaserStyledLabelProvider();
        }

        build(element: HTMLElement) {

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

            iconDivList.forEach((div: HTMLDivElement) => {

                const iconName = div.getAttribute("icon-name");
                const iconControl = new controls.IconControl(MainPlugin.getInstance().getIcon(iconName));
                div.appendChild(iconControl.getCanvas());
            });

            const links = element.querySelectorAll("a");

            links.forEach((link: HTMLAnchorElement) => {

                if (link.classList.contains("LinkToApi")) {

                    link.addEventListener("click", e => {

                        const name = link.getAttribute("apiName");

                        console.log("Click on " + name);

                        const entry = phaser.PhaserPlugin.getInstance().getDocEntry(name);

                        console.log(entry);

                        if (entry) {

                            colibri.Platform.getWorkbench().openEditor(entry);
                        }
                    });

                } else {

                    link.setAttribute("target", "_blank");
                }
            });
        }

        private renderMembers() {

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

        private renderMemberIcon(child: phaser.core.DocEntry, rowContent?: string) {

            const iconName = DOC_ENTRY_KIND_ICON_NAME[child.getKind()];

            const html = `<span class='IconDiv' icon-name='${iconName}' style='margin-right:5px'></span>`;

            if (rowContent) {

                return `<div style='display:flex'>${html}${rowContent}</div>`;
            }

            return html;
        }

        private renderReturns() {

            let html = "";

            const vars = this._docEntry.getRawEntry().returns || [];

            if (vars.length > 0) {

                html += "<p><b>Returns:</b></p>";

                for (const variable of vars) {

                    html += " {" + variable.type.names.map(name => this.renderLinkToApi(name)).join("|") + "}";

                    if (variable.description) {

                        html += `<dd>${showdown.markdownToHtml(variable.description)}</dd>`;
                    }
                }

            }

            return html;
        }

        private renderExtends() {

            const types = this._docEntry.getRawEntry().augments || [];

            if (types.length > 0) {

                let html = " <small><span class='hljs-keyword'><b>extends</b></span></small> ";

                html += types.map(name => "<b><small>" + this.renderLinkToApi(name) + "</small></b>").join(", ");

                return html;
            }

            return "";
        }

        private renderSubtypes() {

            const types = phaser.PhaserPlugin.getInstance().findSubtypes(this._docEntry.getFullName());

            if (types.length > 0) {

                return "<p><b>Subtypes:</b></p> <p>" + types.map(t => this.renderLinkToApi(t) + "<br>").join("") + "</p>";
            }

            return "";
        }

        private renderSince() {

            const since = this._docEntry.getRawEntry().since;

            return since ? `<p><b>Since:</b> ${since}</p>` : "";
        }

        private renderFires() {

            const fires = this._docEntry.getRawEntry().fires;

            let html = "";

            if (fires) {

                html += `<p><b>Fires:</b></p><p>${fires.map(event => `${this.renderLinkToApi(event)}<br>`).join("")}</p>`;
            }

            return html;
        }

        private renderFunctionParams() {

            let html = "";

            const params = this._docEntry.getRawEntry().params || [];

            if (params.length > 0) {

                html += "<p><b>Parameters:</b></p>";

                for (const param of params) {

                    html += `<b>${param.name}${param.optional ? "?" : ""}</b>`;

                    if (param.defaultvalue !== undefined) {

                        html += " [=" + showdown.javascriptToHtml(param.defaultvalue + "") + "]";
                    }

                    html += " {" + param.type.names.map(name => this.renderLinkToApi(name)).join("|") + "}";

                    html += `<dd>${showdown.markdownToHtml(param.description)}</dd>`;
                }
            }

            return html;
        }

        private renderLinkToApi(name: string, fullName = true) {

            name = phaser.PhaserPlugin.cleanApiName(name);

            const label = fullName ? name : name.split(".").pop();

            return `<a href="#" apiName='${name}' class='LinkToApi'>${label}</a>`;
        }

        private renderDescription() {

            const desc = this._docEntry.getDescription();

            const descHtml = showdown.markdownToHtml(desc);

            return `<p>${descHtml}</p>`;
        }

        private renderSignature() {

            let name = this._labelProvider.getStyledTexts(this._docEntry, controls.Controls.getTheme().dark)
                .map(s => `<span style='color:${s.color}'>${s.text}</span>`).join("");

            if (this._docEntry.getParent()) {

                name = this.renderLinkToApi(this._docEntry.getParent().getFullName()) + "." + name;
            }

            name = `<span class='hljs-keyword'>${this._docEntry.getKind()}</span> ${name}`;

            return this.renderMemberIcon(this._docEntry, `<small><b>${name}</b></small>`);
        }
    }
}