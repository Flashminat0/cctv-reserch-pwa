importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: '****',
  authDomain: '*****',
  projectId: '*****',
  storageBucket: '******',
  messagingSenderId: '*****',
  appId: '*****',
  measurementId: '*****',
});

firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => {
  const { title, body } = JSON.parse(payload.data.notification);
  var options = {
    body,
    icon: '/icons/icon-192x192.png',
  };
  registration.showNotification(title, options);
});
