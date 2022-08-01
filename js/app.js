
// Your web app's Firebase configuration
function async dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    script.async = false;
   
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
await dynamicallyLoadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
await dynamicallyLoadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyBPE-loIzu11y2BbiM9Ie6QQoA0LMyQCG8",
  authDomain: "push-notification-demo-638e7.firebaseapp.com",
  projectId: "push-notification-demo-638e7",
  storageBucket: "push-notification-demo-638e7.appspot.com",
  messagingSenderId: "88844666505",
  appId: "1:88844666505:web:580bc5ee8de570049d6858"
};
// For getting client token
const vapidKey = 'BF-nmrF3lsg4dlrLYMkEl_q-5rp6MC5iwf94sQfUHKXMPgpTTyFzkd3Vt9j0Bpnqun-GHBe_WDqOg6-XKx4P_AE'

// Notification data
const notification = {
  'title': 'Portugal vs. Denmark',
  'body': '5 to 1',
  'icon': 'firebase-logo.png',
  'click_action': 'http://localhost:8081'
};

// server key send in Authorization header
const serverkey = 'AAAAFK-OBok:APA91bFG8XKRet1FTR1dbjqBAntU9yX4DvtOfyQRb1CpOWyhoQKqDoeJnOpnJmef4WTIO9M8Peap3lucFnYTARtGss8e-j2MrGf-ImdESYBdcM8SXBmxDpiWfPdFjG2DBIbNTRtLi7UT'

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


function sendPushNotification(token) {

  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      'Authorization': 'key=' + serverkey,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'notification': notification,
      'to': token
    })
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.error(error);
  })
}

messaging.onMessage(res => {
  console.log("res===", res)
})
function subscribePushNotification() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      messaging.getToken({ vapidKey }).then((token) => {
        //  document.getElementById('token-id').innerHTML = token
        sendPushNotification(token);
      })
    }
  })
}
