importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPE-loIzu11y2BbiM9Ie6QQoA0LMyQCG8",
  authDomain: "push-notification-demo-638e7.firebaseapp.com",
  projectId: "push-notification-demo-638e7",
  storageBucket: "push-notification-demo-638e7.appspot.com",
  messagingSenderId: "88844666505",
  appId: "1:88844666505:web:580bc5ee8de570049d6858"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Service Worker-based solution
self.addEventListener('activate', async () => {
  // after we've taken over, iterate over all the current clients (windows)
  const tabs = await self.clients.matchAll({type: 'window'})
  tabs.forEach((tab) => {
    // ...and refresh each one of them
    tab.navigate(tab.url)
  })
})

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'furzy title'//payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    subtitle: ''
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});


function getClientToken() {
  messaging.getToken({ vapidKey }).then((token) => {
    console.log('token====', token)
    document.getElementById('shopify-section-slideshow').innerHTML = token
    // sendPushNotification(token);
  })
}
