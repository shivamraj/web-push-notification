importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBPE-loIzu11y2BbiM9Ie6QQoA0LMyQCG8",
  authDomain: "push-notification-demo-638e7.firebaseapp.com",
  projectId: "push-notification-demo-638e7",
  storageBucket: "push-notification-demo-638e7.appspot.com",
  messagingSenderId: "88844666505",
  appId: "1:88844666505:web:580bc5ee8de570049d6858"
};


// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
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
