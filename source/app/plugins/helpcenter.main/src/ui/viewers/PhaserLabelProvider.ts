namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class PhaserLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: any): string {

            if (obj instanceof helpcenter.phaser.core.PhaserFile) {

                return obj.getName();
            }

            if (obj instanceof phaser.core.DocEntry) {

                return obj.getRawEntry().name;
            }

            return "";
        }
    }
}