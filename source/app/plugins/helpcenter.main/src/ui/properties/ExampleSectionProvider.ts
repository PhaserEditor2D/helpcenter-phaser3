namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class ExampleSectionProvider implements controls.properties.PropertySectionProvider {

        addSections(page: controls.properties.PropertyPage, sections: Array<controls.properties.PropertySection<any>>): void {
            sections.push(
                new ExampleSourceSection(page),
                new ExampleImageSection(page),
            );
        }

        getEmptySelectionObject() {

            return null;
        }

        getEmptySelectionArray() {

            return [];
        }
    }
}