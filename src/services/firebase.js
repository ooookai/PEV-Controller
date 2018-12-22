import Firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB5jFR56pNiHP-A6B6MDZBbpwtDBABkXms',
  authDomain: 'pev-controller.firebaseapp.com',
  databaseURL: 'https://pev-controller.firebaseio.com',
  projectId: 'pev-controller',
  storageBucket: 'pev-controller.appspot.com',
  messagingSenderId: '936601485810',
}

export const FirebaseApp = Firebase.initializeApp(config)

export let db = FirebaseApp.database()
