const cacheName = 'portfolio-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/styles.css',
    '/assets/js/main.js',
    '/assets/css/fonts.css',
    '/assets/fonts/Poppins-Regular.ttf',
    '/assets/fonts/Poppins-SemiBold.ttf',
    '/assets/fonts/Poppins-Bold.ttf',
    '/assets/img/perfil.png',
    '/assets/img/about.jpg',
    '/assets/img/work1.jpg',
    '/assets/img/work2.jpg',
    '/assets/img/work3.jpg',
    '/assets/img/work4.jpg',
    '/assets/img/work5.jpg',
    '/assets/img/work6.jpg'
];
// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Caching assets');
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== cacheName).map(key => caches.delete(key))
            );
        })
    );
});
