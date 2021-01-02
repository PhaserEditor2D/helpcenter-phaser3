namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class ExampleLabelProvider implements controls.viewers.ILabelProvider {

        getLabel(obj: phaser.core.ExampleInfo): string {

            return obj.getName();
        }
    }
}
