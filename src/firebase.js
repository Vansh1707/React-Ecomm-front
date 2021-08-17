import firebase from "firebase/app";
import "firebase/auth";
  
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyyzUyo-N0WtyI0YkPgsECr4RyMjtTdAQ",
    authDomain: "ecommerce-a3309.firebaseapp.com",
    projectId: "ecommerce-a3309",
    storageBucket: "ecommerce-a3309.appspot.com",
    messagingSenderId: "316651739505",
    appId: "1:316651739505:web:ea7e76d39471b75a08bed0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export
    export const auth = firebase.auth();
    export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
