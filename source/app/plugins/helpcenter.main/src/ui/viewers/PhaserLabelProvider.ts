namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class PhaserLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: any): string {

            if (typeof obj === "string") {

                return obj;
            }

            if (obj instanceof helpcenter.phaser.core.PhaserFile) {

                return obj.getName();
            }

            if (obj instanceof phaser.core.DocEntry) {

                return obj.getName() + obj.getMethodSignature()
                    + obj.getReturnsTypeSignature() + obj.getTypeSignature();
            }

            return "";
        }
    }
}