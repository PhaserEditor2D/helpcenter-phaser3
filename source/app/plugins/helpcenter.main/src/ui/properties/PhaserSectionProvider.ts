namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class PhaserSectionProvider extends controls.properties.PropertySectionProvider {

        addSections(page: controls.properties.PropertyPage, sections: Array<controls.properties.PropertySection<any>>): void {

            sections.push(
                new DocEntryFileSection(page),
                new FileSection(page),
                new DescriptionSection(page)
            );
        }
    }
}