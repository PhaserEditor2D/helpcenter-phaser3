namespace helpcenter.main.ui.views {

    import controls = colibri.ui.controls;

    export abstract class AbstractExampleView extends colibri.ui.ide.ViewerView {
        private _propertyProvider: properties.ExampleSectionProvider;

        getPropertyProvider() {

            if (!this._propertyProvider) {

                this._propertyProvider = new ui.properties.ExampleSectionProvider();
            }

            return this._propertyProvider;
        }
    }
}