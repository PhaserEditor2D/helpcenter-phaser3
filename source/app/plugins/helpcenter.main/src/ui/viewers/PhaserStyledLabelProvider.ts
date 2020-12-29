namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class PhaserStyledLabelProvider implements controls.viewers.IStyledLabelProvider {

        private _labelProvider: controls.viewers.ILabelProvider;

        constructor() {

            this._labelProvider = new PhaserLabelProvider();
        }

        getStyledTexts(obj: any, dark: boolean): controls.viewers.IStyledText[] {

            const theme = controls.Controls.getTheme();

            if (obj instanceof phaser.core.DocEntry) {

                return [{
                    color: theme.viewerForeground,
                    text: obj.getName()
                }, {
                    color: dark ? "gray" : "brown",
                    text: obj.getMethodSignature()
                }, {
                    color: dark ? "gray" : "darkCyan",
                    text: obj.getReturnsTypeSignature()
                }, {
                    color: dark ? "gray" : "darkCyan",
                    text: obj.getTypeSignature()
                }];
            }

            return [{
                color: theme.viewerForeground,
                text: this._labelProvider.getLabel(obj)
            }];
        }
    }
}