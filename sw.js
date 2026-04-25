const C='reefos-v2-multi-tank-profiles';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(C).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  event.respondWith(fetch(event.request).then(res=>{
    const copy=res.clone();
    caches.open(C).then(cache=>cache.put(event.request,copy)).catch(()=>{});
    return res;
  }).catch(()=>caches.match(event.request)));
});
