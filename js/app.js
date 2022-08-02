
// Your web app's Firebase configuration
const loadDynamicScript = (url, callback) => {
  const existingScript = document.getElementById('scriptId');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url; // URL for the third-party library being loaded.
    script.id = 'libraryName' + new Date(); // e.g., googleMaps or stripe
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};
loadDynamicScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js', () => {
  loadDynamicScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js', loadFile);
});

const firebaseConfig = {
  apiKey: "AIzaSyBPE-loIzu11y2BbiM9Ie6QQoA0LMyQCG8",
  authDomain: "push-notification-demo-638e7.firebaseapp.com",
  projectId: "push-notification-demo-638e7",
  storageBucket: "push-notification-demo-638e7.appspot.com",
  messagingSenderId: "88844666505",
  appId: "1:88844666505:web:580bc5ee8de570049d6858"
};
// For getting client token
var vapidKey = 'BF-nmrF3lsg4dlrLYMkEl_q-5rp6MC5iwf94sQfUHKXMPgpTTyFzkd3Vt9j0Bpnqun-GHBe_WDqOg6-XKx4P_AE'

// Notification data
var notification = {
  'title': 'Portugal vs. Denmark',
  'body': '5 to 1',
  'icon': 'firebase-logo.png',
  'click_action': 'http://localhost:8081'
};

// server key send in Authorization header
var serverkey = 'AAAAFK-OBok:APA91bFG8XKRet1FTR1dbjqBAntU9yX4DvtOfyQRb1CpOWyhoQKqDoeJnOpnJmef4WTIO9M8Peap3lucFnYTARtGss8e-j2MrGf-ImdESYBdcM8SXBmxDpiWfPdFjG2DBIbNTRtLi7UT'
var messaging;

function loadFile() {

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  messaging.onMessage(res => {
    var notification1 = new Notification(res.notification.title, { body: res.notification.message, icon: res.notification.icon, subtitle: res.notification.subtitle });
  })
}


function saveClientTokenOnServer(token) {

  fetch('http://thenotifiers.000webhostapp.com/put?' + new URLSearchParams({
    id: token,
  }), {
    'method': 'GET',
  }).then(function (response) {
    console.log("token save on backend", response);
  }).catch(function (error) {
    console.error("not saved", error);
  })
}

function getClientToken() {
  messaging.getToken({ vapidKey }).then((token) => {
    console.log('token====', token)
    document.getElementById('token').innerHTML = token
    saveClientTokenOnServer(token);
    //shopify-section-slideshow
  })
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/web-push-notification/firebase-messaging-sw.js', { updateViaCache: 'none' })
      .then((registration) => {
        messaging.useServiceWorker(registration);
        // request notification permission and get token
        console.log('Registration successful, scope is:', registration.scope);
        getClientToken();
        //TODO: ask For Permission To Receive Notifications
      }).catch(function (err) {
        console.log('Service worker registration failed, error:', err);
      });
  }
}

function subscribePushNotification() {

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        registerServiceWorker();
      }
    })
  }
}

window.onload = () => {
  subscribePushNotification();
}

