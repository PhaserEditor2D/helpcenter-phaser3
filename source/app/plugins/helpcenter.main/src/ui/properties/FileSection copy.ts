/// <reference path="./AbstractFileSection.ts" />

namespace helpcenter.main.ui.properties {

    import controls = colibri.ui.controls;

    export class FileSection extends AbstractFileSection {

        constructor(page: controls.properties.PropertyPage) {
            super(page, "helpcenter.main.ui.properties.FileSection", "File", false, false);
        }

        getFileInfo(): { filename: string; path: string; } {

            const file = this.getSelectionFirstElement() as phaser.core.PhaserFile;

            return { filename: file.getName(), path: (file.getParent() ? file.getParent().getPath() : "") };
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof phaser.core.PhaserFile;
        }
    }
}