const CACHE_NAME = 'pwa-task-manager';
const urlsToCache = [
  '/'
];

// Install a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
  const cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', event => {
  const {notification} = event;
  const {action} = event;
  if (action === 'cancel') {
      notification.close();
      return;
  }
  notification.close();
  clients.openWindow('https://kcfeed.kr/');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
  const {data} = event;
  const options = {
    body: '전자결재',
    icon: '/favicon-96x96.png',
    actions: [
      {action: 'confirm', title: '확인'},
      {action: 'cancel', title: '취소'}
    ]
  };
  event.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    // self.registration.showNotification(data.text(), options)
    self.registration.showNotification(data.text(), options)
  );
});
