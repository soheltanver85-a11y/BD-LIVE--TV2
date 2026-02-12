const CACHE_NAME = 'rivo-tv-offline-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/hls.js@latest'
];

// ইনস্টল করার সময় ফাইলগুলো সেভ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// নেট না থাকলে ক্যাশ থেকে ফাইল দেখানো
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // যদি একদমই কিছু না পাওয়া যায় তবে index.html রিটার্ন করবে
      return caches.match('/index.html');
    })
  );
});
