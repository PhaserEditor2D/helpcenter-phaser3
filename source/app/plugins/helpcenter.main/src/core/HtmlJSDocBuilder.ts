namespace helpcenter.main.core {

    import controls = colibri.ui.controls;

    export class HtmlJSDocBuilder {

        private _docEntry: phaser.core.DocEntry;
        private _labelProvider: ui.viewers.PhaserStyledLabelProvider;

        constructor(docEntry: phaser.core.DocEntry) {

            this._docEntry = docEntry;
            this._labelProvider = new main.ui.viewers.PhaserStyledLabelProvider();
        }

        build() {

            let html = "";

            html += this.renderSignature();

            html += this.renderExtends();

            html += this.renderDescription();

            html += this.renderSince();

            html += this.renderFires();

            html += this.renderFunctionParams();

            html += this.renderSubtypes();

            return `<div class='jsdocArea'>${html}</div>`;
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

                    html += " " + param.type.names.map(name => this.renderLinkToApi(name)).join("|");

                    html += `<dd>${showdown.markdownToHtml(param.description)}</dd>`;
                }

            }

            return html;
        }

        private renderLinkToApi(name: string) {

            name = name.replace("#event:", "#").replace("#", ".");

            return `<a href="#">${name}</a>`;
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

            return `<small><b>${name}</b></small>`;
        }
    }
}