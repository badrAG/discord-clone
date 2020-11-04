import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDhUKtiZ82_pHV4JltulSJF5MxRYcX_TF8",
    authDomain: "discord-clone-81d49.firebaseapp.com",
    databaseURL: "https://discord-clone-81d49.firebaseio.com",
    projectId: "discord-clone-81d49",
    storageBucket: "discord-clone-81d49.appspot.com",
    messagingSenderId: "815966004897",
    appId: "1:815966004897:web:62eb5fe828736b368572e0",
    measurementId: "G-6MMLRR0H3C"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth ,provider};
  export default db;

  