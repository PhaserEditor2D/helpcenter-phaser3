namespace helpcenter.codemirror {

    export class CodeMirrorPlugin extends colibri.Plugin {

        private static _instance = new CodeMirrorPlugin();

        static getInstance() {

            return this._instance;
        }

        constructor() {
            super("helpcenter.codemirror");
        }
    }

    colibri.Platform.addPlugin(CodeMirrorPlugin.getInstance());
}