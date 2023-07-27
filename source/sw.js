const VER = "1.3.0";

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

	event.waitUntil(handleActivate());
});

self.addEventListener("fetch", function (event) {

	event.respondWith(handleFetch(event));
});

async function handleActivate() {

	await checkNewVersions();

	await deleteOldCaches();

	await clients.claim();
}

async function handleFetch(event) {

	const request = event.request;
	const url = request.url;

	const cache = await caches.open(CACHE_KEY);

	const resp = await cache.match(url);

	if (resp) {

		return resp;
	}

	const resp2 = await fetch(url);

	if (resp2.status === 200) {

		await cache.put(url, resp2.clone());
	}

	return resp2;
}

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