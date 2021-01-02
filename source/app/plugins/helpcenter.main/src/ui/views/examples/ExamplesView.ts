/// <reference path="../AbstractExampleView.ts"/>

namespace helpcenter.main.ui.views.examples {

    import controls = colibri.ui.controls;

    export class ExamplesView extends AbstractExampleView {

        constructor() {
            super("helpcenter.main.ui.views.examples.ExamplesView");

            this.setTitle("Examples");
            this.setIcon(MainPlugin.getInstance().getIcon(ICON_LABS));
        }
    }
}