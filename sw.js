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
      .then(function (cache) {
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
      .then(function (response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
  );
});

// Update a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', event => {

  let notification = event.notification;
  let action = event.action;
  notification.close();


  if (action === 'confirm') {
    clients.openWindow('http://localhost:3000/')
    console.log('confirm was chosone');
  } else {
    console.log(action);
  }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
  const data = event.data;
  const options = {
    body: '전자결재',
    icon: '/favicon_192.png',
    actions: [
      {action: 'confirm', title: '확인', icon: '/favicon-96x96.png'},
      {action: 'cancel', title: '취소', icon: '/favicon-96x96.png'}
    ]
  };
  event.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    // self.registration.showNotification(data.text(), options)
    self.registration.showNotification(data.text(), options)
  );
});
