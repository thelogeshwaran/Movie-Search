import firebase from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyCqtaa1BL6nd4fzGSZUIk3IEupw5jIBZ4Q",
    authDomain: "movie-app-e3839.firebaseapp.com",
    projectId: "movie-app-e3839",
    storageBucket: "movie-app-e3839.appspot.com",
    messagingSenderId: "517748188330",
    appId: "1:517748188330:web:8557ec03346c165bb6dcd3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };