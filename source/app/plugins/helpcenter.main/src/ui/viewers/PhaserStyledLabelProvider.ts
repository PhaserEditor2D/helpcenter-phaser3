namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class PhaserStyledLabelProvider implements controls.viewers.IStyledLabelProvider {

        private _labelProvider: controls.viewers.ILabelProvider;
        private _showFullName: boolean;

        constructor(showFullName = false) {

            this._showFullName = showFullName;
            this._labelProvider = new PhaserLabelProvider();
        }

        getStyledTexts(obj: any, dark: boolean): controls.viewers.IStyledText[] {

            const theme = controls.Controls.getTheme();
            const styles = dark? DARK_SYNTAX_COLOR : LIGHT_SYNTAX_COLOR;

            if (obj instanceof phaser.core.DocEntry) {

                return [{
                    color: theme.viewerForeground + (obj.isInherited()? "a0": ""),
                    text: this._showFullName? obj.getFullName() : obj.getName()
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
}