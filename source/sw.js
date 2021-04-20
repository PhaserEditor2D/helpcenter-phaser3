const VER = "1.0.0-beta1_23";

// -- start here -- //

const CACHE_KEY = "helpcenter-static-" + VER;

const channel = new BroadcastChannel('sw-messages');

self.addEventListener("install", async (event) => {

	console.log("SW: installing...");

	self.skipWaiting();

	event.waitUntil(caches.open(CACHE_KEY));
});

self.addEventListener("activate", event => {

	console.log("SW: activating...");

	event.waitUntil(

		checkNewVersions().then(deleteOldCaches).then(() => clients.claim())
	);
});

self.addEventListener("fetch", function (event) {
	
	const req = event.request;
	const url = req.url;

	event.respondWith(

		caches
			.match(event.request, { cacheName: CACHE_KEY })
			.then(resp => {

				if (resp) {

					// console.log("SW: responds from cache " + url);

					return resp;
				}

				// console.log("SW: fetch " + url);

				return fetch(req)

					.then(resp => {

						if (resp.status === 200) {

							// console.log("SW: cache put " + url);

							return caches
								.open(CACHE_KEY)
								.then(cache => cache.put(url, resp.clone()))
								.then(() => resp);
						}

						return resp;
					});
			})
	);
});

async function checkNewVersions() {

	return caches.keys().then(keys => {

		for (const k of keys) {

			if (k !== CACHE_KEY && k.startsWith("helpcenter-static-")) {

				channel.postMessage({
					method: "update-available",
					ver: VER
				});

				return;
			}
		}
	});
}

async function deleteOldCaches() {

	return caches.keys().then(cacheNames => {

		console.log("SW: current cache version " + CACHE_KEY);

		return Promise.all(
			cacheNames.map(name => {

				if (name !== CACHE_KEY) {

					console.log("SW: deleting " + name);

					return caches.delete(name);
				}
			}));
	});
}