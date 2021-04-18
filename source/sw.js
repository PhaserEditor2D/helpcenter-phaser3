const VER = "1.0.0-beta2";

const assets = [
	"/",
	"/ver",
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
	"app/plugins/colibri/styles/controls.css?v=1.0.0-beta2",
	"app/plugins/colibri/styles/light.css?v=1.0.0-beta2",
	"app/plugins/colibri/styles/workbench.css?v=1.0.0-beta2",
	"app/plugins/colibri/styles/dark.css?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom_out@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/close@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/dirty.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/menu.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-expand-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/checked@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-collapse-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/plus.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom_out.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/file.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-expand@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-collapse-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/color@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/small-menu.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-expand-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-expand.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-collapse@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/folder.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-collapse.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom-reset@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-collapse@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-collapse-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-expand.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/plus@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom_in@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/delete.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-expand@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/minus.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom-reset.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/dirty@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/checked.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/keymap@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/keymap.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/close.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/delete@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/file@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/minus@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/color.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/menu@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/tree-collapse.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/section-collapse-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/small-menu@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/zoom_in.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/dark/folder@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom_out@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/close@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/dirty.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/menu.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-expand-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/checked@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-collapse-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/plus.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom_out.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/file.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-expand@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-collapse-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/color@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/small-menu.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-expand-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-expand.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-collapse@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/folder.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-collapse.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom-reset@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-collapse@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-collapse-left@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-expand.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/plus@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom_in@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/add@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/delete.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-expand@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/minus.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/add.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom-reset.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/dirty@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/checked.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/keymap@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/keymap.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/close.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/delete@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/file@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/minus@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/color.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/menu@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/tree-collapse.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/section-collapse-left.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/small-menu@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/zoom_in.png?v=1.0.0-beta2",
	"app/plugins/colibri/icons/light/folder@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri/_out/colibri.js?v=1.0.0-beta2",
	"app/plugins/colibri/scripts/vanilla-picker/vanilla-picker.js?v=1.0.0-beta2",
	"app/plugins/colibri/scripts/expr-eval/expr-eval.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/themes/darcula.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/lib/codemirror.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/lib/codemirror.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/mode/javascript/javascript.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/jump-to-line.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/searchcursor.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/search/search.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/dialog/dialog.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/codemirror-5.59.0/addon/dialog/dialog.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.codemirror/_out/helpcenter.codemirror.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/_out/helpcenter.phaser.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/phaser-examples.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/phaser-code.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/phaser-docs.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/phaser-examples-code.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-0.jpg?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-2.jpg?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-3.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-4.jpg?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-1.jpg?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-1.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-3.jpg?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-4.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-0.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.phaser/data/examples-screenshots-atlas/texture-2.json?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/styles/styles.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-constant@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-method@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/file-script@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-enumerator.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/play.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-interface.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-variable.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-method.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-namespace@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-variable@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/experimental@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-class@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-field.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/file-script.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-property.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/help@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-interface@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-property@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-field@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/experimental.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-namespace.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-constant.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/play@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-enumerator@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/symbol-class.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/dark/help.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-constant@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-method@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/file-script@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-enumerator.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/play.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-interface.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-variable.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-method.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-namespace@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-variable@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/experimental@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-class@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-field.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/file-script.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-property.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/help@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-interface@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-property@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-field@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/experimental.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-namespace.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-constant.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/play@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-enumerator@2x.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/symbol-class.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/icons/light/help.png?v=1.0.0-beta2",
	"app/plugins/helpcenter.main/_out/helpcenter.main.js?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/styles/InspectorView.css?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/icons/dark/inspector@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/icons/dark/inspector.png?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/icons/light/inspector@2x.png?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/icons/light/inspector.png?v=1.0.0-beta2",
	"app/plugins/colibri.inspector/_out/colibri.inspector.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/highlight/styles/vs.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/highlight/styles/darcula.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/highlight/custom.css?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/highlight/highlight.pack.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/_out/helpcenter.showdown.js?v=1.0.0-beta2",
	"app/plugins/helpcenter.showdown/showdown/showdown.min.js?v=1.0.0-beta2"];

const CACHE_KEY = "phasereditor2d.helpcenter-" + VER;

self.addEventListener('install', async (event) => {

	self.skipWaiting();

	event.waitUntil(
		caches.open(CACHE_KEY)
			.then(cache => {

				console.log('Opened cache ' + CACHE_KEY);

				return cache.addAll(assets);
			}));
});

const channel = new BroadcastChannel('sw-messages');

self.addEventListener('activate', event => {

	event.waitUntil(
		caches.keys().then(cacheNames => {

			console.log("Current cache version " + CACHE_KEY);

			const promises = [];
			
			for (const cacheName of cacheNames) {

				console.log("Testing cache version " + cacheName);

				if (cacheName !== CACHE_KEY) {

					console.log("Deleting cache version " + cacheName);

					promises.push(caches.delete(cacheName));
				}
			}

			if (promises.length > 0) {

				channel.postMessage({
					method: "update-installed",
					ver: VER
				});
			}

			return Promise.all(promises);
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