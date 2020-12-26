namespace helpcenter.phaser.core {

    export class DocEntry {

        private _rawEntry: IJSDocEntry;

        constructor(rawEntry: IJSDocEntry) {

            this._rawEntry = rawEntry;
        }

        getRawEntry() {

            return this._rawEntry;
        }
    }
}