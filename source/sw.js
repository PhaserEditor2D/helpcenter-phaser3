const VER = "1.0.22";

const CACHE_KEY = "phasereditor2d.helpcenter-" + VER;

const assets = [
    "/",
    "/manifest.json",
    "/icons/icon-72.png",
    "/icons/icon-96.png",
    "/icons/icon-128.png",
    "/icons/icon-144.png",
    "/icons/icon-152.png",
    "/icons/icon-192.png",
    "/icons/icon-384.png",
    "/icons/icon-512.png",

    "/app/favicon.png",
    "/app/splash.svg",

    // plugins
    "/app/plugins/colibri/styles/controls.css?v=" + VER,
    "/app/plugins/colibri/styles/light.css?v=" + VER,
    "/app/plugins/colibri/styles/workbench.css?v=" + VER,
    "/app/plugins/colibri/styles/dark.css?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom_out@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/close@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/dirty.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/menu.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-expand-left.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/checked@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-collapse-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/plus.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom_out.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/file.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-expand@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-collapse-left.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/color@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/small-menu.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-expand-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-expand.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-collapse@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/folder.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-collapse.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom-reset@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-collapse@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-collapse-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-expand.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/plus@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom_in@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/delete.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-expand@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/minus.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom-reset.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/dirty@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/checked.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/keymap@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/keymap.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/close.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/delete@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/file@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/minus@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/color.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/menu@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/tree-collapse.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/section-collapse-left.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/small-menu@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/zoom_in.png?v=" + VER,
    "/app/plugins/colibri/icons/dark/folder@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom_out@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/close@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/dirty.png?v=" + VER,
    "/app/plugins/colibri/icons/light/menu.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-expand-left.png?v=" + VER,
    "/app/plugins/colibri/icons/light/checked@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-collapse-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/plus.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom_out.png?v=" + VER,
    "/app/plugins/colibri/icons/light/file.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-expand@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-collapse-left.png?v=" + VER,
    "/app/plugins/colibri/icons/light/color@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/small-menu.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-expand-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-expand.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-collapse@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/folder.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-collapse.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom-reset@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-collapse@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-collapse-left@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-expand.png?v=" + VER,
    "/app/plugins/colibri/icons/light/plus@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom_in@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/add@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/delete.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-expand@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/minus.png?v=" + VER,
    "/app/plugins/colibri/icons/light/add.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom-reset.png?v=" + VER,
    "/app/plugins/colibri/icons/light/dirty@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/checked.png?v=" + VER,
    "/app/plugins/colibri/icons/light/keymap@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/keymap.png?v=" + VER,
    "/app/plugins/colibri/icons/light/close.png?v=" + VER,
    "/app/plugins/colibri/icons/light/delete@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/file@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/minus@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/color.png?v=" + VER,
    "/app/plugins/colibri/icons/light/menu@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/tree-collapse.png?v=" + VER,
    "/app/plugins/colibri/icons/light/section-collapse-left.png?v=" + VER,
    "/app/plugins/colibri/icons/light/small-menu@2x.png?v=" + VER,
    "/app/plugins/colibri/icons/light/zoom_in.png?v=" + VER,
    "/app/plugins/colibri/icons/light/folder@2x.png?v=" + VER,
    "/app/plugins/colibri/_out/colibri.js?v=" + VER,
    "/app/plugins/colibri/plugin.json?v=" + VER,
    "/app/plugins/colibri/scripts/vanilla-picker/vanilla-picker.js?v=" + VER,
    "/app/plugins/colibri/scripts/expr-eval/expr-eval.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/themes/darcula.css?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/lib/codemirror.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/lib/codemirror.css?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/mode/javascript/javascript.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/jump-to-line.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/searchcursor.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/search.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/dialog/dialog.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/dialog/dialog.css?v=" + VER,
    "/app/plugins/helpcenter.codemirror/_out/helpcenter.codemirror.js?v=" + VER,
    "/app/plugins/helpcenter.codemirror/plugin.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/_out/helpcenter.phaser.js?v=" + VER,
    "/app/plugins/helpcenter.phaser/plugin.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/phaser-examples.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/phaser-code.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/phaser-docs.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/phaser-examples-code.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-0.jpg?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-2.jpg?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-3.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-4.jpg?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-1.jpg?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-1.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-3.jpg?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-4.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-0.json?v=" + VER,
    "/app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-2.json?v=" + VER,
    "/app/plugins/helpcenter.main/styles/styles.css?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-constant@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-method@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/file-script@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-enumerator.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/play.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-interface.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-variable.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-method.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-namespace@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-variable@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/experimental@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-class@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-field.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/file-script.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-property.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/help@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-interface@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-property@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-field@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/experimental.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-namespace.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-constant.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/play@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-enumerator@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/symbol-class.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/dark/help.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-constant@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-method@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/file-script@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-enumerator.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/play.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-interface.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-variable.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-method.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-namespace@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-variable@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/experimental@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-class@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-field.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/file-script.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-property.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/help@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-interface@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-property@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-field@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/experimental.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-namespace.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-constant.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/play@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-enumerator@2x.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/symbol-class.png?v=" + VER,
    "/app/plugins/helpcenter.main/icons/light/help.png?v=" + VER,
    "/app/plugins/helpcenter.main/_out/helpcenter.main.js?v=" + VER,
    "/app/plugins/helpcenter.main/plugin.json?v=" + VER,
    "/app/plugins/colibri.inspector/styles/InspectorView.css?v=" + VER,
    "/app/plugins/colibri.inspector/icons/dark/inspector@2x.png?v=" + VER,
    "/app/plugins/colibri.inspector/icons/dark/inspector.png?v=" + VER,
    "/app/plugins/colibri.inspector/icons/light/inspector@2x.png?v=" + VER,
    "/app/plugins/colibri.inspector/icons/light/inspector.png?v=" + VER,
    "/app/plugins/colibri.inspector/_out/colibri.inspector.js?v=" + VER,
    "/app/plugins/colibri.inspector/plugin.json?v=" + VER,
    "/app/plugins/helpcenter.showdown/highlight/styles/vs.css?v=" + VER,
    "/app/plugins/helpcenter.showdown/highlight/styles/darcula.css?v=" + VER,
    "/app/plugins/helpcenter.showdown/highlight/custom.css?v=" + VER,
    "/app/plugins/helpcenter.showdown/highlight/highlight.pack.js?v=" + VER,
    "/app/plugins/helpcenter.showdown/_out/helpcenter.showdown.js?v=" + VER,
    "/app/plugins/helpcenter.showdown/showdown/showdown.min.js?v=" + VER,
    "/app/plugins/helpcenter.showdown/plugin.json?v=" + VER
];

self.addEventListener('install', function (event) {

    self.skipWaiting();

    // Perform install steps
    event.waitUntil(

        caches.open(CACHE_KEY)

            .then(cache => {

                console.log('Opened cache ' + CACHE_KEY);

                return cache.addAll(assets);
            })
    );
});

const channel = new BroadcastChannel('sw-messages');

self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {

            console.log("Current cache version " + CACHE_KEY);

            for (const cacheName of cacheNames) {

                console.log("Testing cache version " + cacheName);

                if (cacheName !== CACHE_KEY) {

                    console.log("Deleting cache version " + cacheName);

                    channel.postMessage({
                        method: "update-installed",
                        ver: VER
                    });

                    return caches.delete(cacheName);
                }
            }
        })
    )
});

self.addEventListener('fetch', function (event) {

    event.respondWith(

        caches.match(event.request)
            .then(function (response) {

                if (response) {

                    return response;
                }

                console.log("fetch from network: " + event.request.url);

                return fetch(event.request);
            })
    );
});
