// The service worker for kundli.bipul.in, the site's former address.
//
// The app installed from here left a service worker that keeps serving it from
// its cache. Whenever that app opens, the browser checks this file for changes,
// finds this one and installs it in place of the old one. It deletes the old
// caches, removes itself and reloads the app's pages, which then load
// index.html from the network: that page asks people to switch to the app at
// the site's new address.

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const page of await self.clients.matchAll({ type: "window" }))
        page.navigate(page.url).catch(() => {});
    })(),
  );
});
