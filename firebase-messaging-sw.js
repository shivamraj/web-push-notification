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
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
// update service worker when changes found in sw.js
self.addEventListener('install', evt=> {
     self.skipWaiting();
});
self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const options = {}
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log("active====",JSON.stringify(subscription))
  } catch (err) {
    console.log('Error', err)
  }
  self.clients.claim()
})
//self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('notificationclick', function(event) {  
  var messageId = event.notification.data;
  console.log('notificationclick',event);
  event.notification.close();  
    
  if (event.action === 'like') {  
    console.log('liked') 
  }  
  else if (event.action === 'reply') {  
    console.log('replied') 
    clients.openWindow("/messages?reply=" + messageId);  
  }  
}, false);

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const buttonOneText = payload.data.buttonOne
  const buttonTwoText = payload.data.buttonTwo
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    image: payload.data.notificationImage,
  };

  const actions = [];
  if(buttonOneText){
    actions.push({action: 'action1', title: buttonOneText})
  }
  if(buttonTwoText){
    actions.push({action: 'action2', title: buttonTwoText})
  }

  if(actions.length)
    notificationOptions["actions"] = actions;

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

