namespace helpcenter.main.ui.viewers {

    import controls = colibri.ui.controls;

    export class ExampleContentProvider implements controls.viewers.ITreeContentProvider {

        getRoots(input: any): any[] {

            return phaser.PhaserPlugin.getInstance().getExamples();
        }

        getChildren(parent: phaser.core.ExampleInfo): any[] {

            return parent.getChildren();
        }
    }
}
