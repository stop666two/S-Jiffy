self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  var url = event.request.url;
  var marker = '/ffmpeg/npm/';
  if (url.indexOf(marker) === -1) return;
  var target = 'https://cdn.jsdelivr.net/npm/' + url.split(marker)[1];
  event.respondWith(
    fetch(target, { credentials: 'omit' }).then(function (r) {
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: r.headers
      });
    }).catch(function () {
      return new Response('FFMPEG_PROXY_ERROR ' + target, { status: 502 });
    })
  );
});
