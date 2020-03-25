import * as firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyC5aK6RObQz-lg9pN17zYRLc1rCKU-mDCE",
    authDomain: "waselle-cd52a.firebaseapp.com",
    databaseURL: "https://waselle-cd52a.firebaseio.com",
    projectId: "waselle-cd52a",
    storageBucket: "waselle-cd52a.appspot.com",
    messagingSenderId: "64047095150",
    appId: "1:64047095150:web:afc7eb4a1dab7c8a7c357f",
    measurementId: "G-L6SKBNPBM2"
  });
export {firebaseConfig};
export {firebaseConfig as firebase };

