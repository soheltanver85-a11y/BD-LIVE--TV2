const CACHE_NAME = 'rivo-tv-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap'
];

// ইনস্টল করার সময় ফাইলগুলো সেভ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// নেট না থাকলে সেভ করা ফাইল থেকে ডেটা দেখানো
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
