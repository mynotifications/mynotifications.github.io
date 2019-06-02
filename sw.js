self.addEventListener('install', event => {
    if (self.registration.active) {
        showNotification('Service Worker', 'Installing Service Worker');
    }
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
    const data = event.data.json();
    event.waitUntil(showNotification(data.title, data.time + ' - ' + data.text));
});

self.addEventListener('pushsubscriptionchange', event => {
    event.waitUntil(showNotification('Service Worker', 'Push subscription expired'));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
});

function showNotification(title, body) {
    return self.registration.showNotification(title, {
        body: body,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', // 1x1 transparent png
        badge:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACH0lEQVR42u1YO0sDQRBOVMRHFB/RQlAwYBFQW8VGFCvBH2AjYuwULXz9ABs7RRQhKIiVhbWNiCKCiNpZ+III4oMUGhNNjLlL/Fb2YAiJz5DckP3gY5bc7mW/25nZ2bVYFBQUFBQUsg2xWKxQ0zQXOPYDDqJ/dzgcboatBUtAa0YFBAKBakziMvY7vIEX4Dro8vl85dwEGIgCL7C7YJMpBGBCT6A7EfF4A9xH2wP7KrqTcYcw9RkXoOv6yTcxkws6EA/DmPQpESHsqukFECE5kUikHfaWuFQYbGUhgAiZpkGB8fOsBIRCIQeGaSQWDoSbsREgV+GRLMIZWMxKAL76TZwAGxsBfr+/UgavgSMwn1MQD9D9AOPdbIIY3RvgPudxJUab6QWgWx7YAW6RDKSDy2kv7hIIuBYVZxL24PkU7Db4ICf9mT3x+x5sHbtiDgzCjXZgndyqUV1mnBFkIruZyumgqDiT8Bh8J26z6PF4Ckx1oPkqiPFY5PxNI23KstrJSYAVZXQvJv5MVmGFjQApwiYzjoEQ2MVGgBTRKTctAyI+SjkJsMKN1kgs+GH6M3JD8Y8TWSM5jUXl5lbFRoBIn+g7G1dK9LERIFehhZ6J4UpXMDWcBIgbijlaWmD8QlpjIQXnATu+/B1Zhfu03kyk6Ew8REoMDe9Ygi1KiwCv1ys2pkn84Ywg2qN/EFCBHXrceAfaE7BlFgUFBQUFhWzCB9w4o56LyaXoAAAAAElFTkSuQmCC',
        vibrate: [200, 100, 200, 100, 200]
    });
}
