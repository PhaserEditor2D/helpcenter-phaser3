/// <reference path="./AbstractFileSection.ts" />

namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class DocEntryFileSection extends AbstractFileSection {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.DocEntryFileSection", "File", false, false);
        }

        getFileInfo(): { filename: string; path: string; } {

            return phaser.core.DocEntry.getDocEntry(this.getSelectionFirstElement()).getRawEntry().meta;
        }

        canEdit(obj: any, n: number): boolean {

            return phaser.core.DocEntry.canAdapt(obj);
        }
    }
}