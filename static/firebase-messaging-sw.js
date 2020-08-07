
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDUYnB2wLuKChArUAJITeqeLw-60Lo8AVE","authDomain":"fb-test-4125a.firebaseapp.com","databaseURL":"https:\u002F\u002Ffb-test-4125a.firebaseio.com","projectId":"fb-test-4125a","storageBucket":"fb-test-4125a.appspot.com","messagingSenderId":"658751976044","appId":"1:658751976044:web:4ca5df4afc398e75e2de49","measurementId":"G-R0LG59XNRD"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"\u003CrandomName\u003E","url":"\u003CrandomUrl\u003E"}]
  const action = actions.find(x => x.id === e.action.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
