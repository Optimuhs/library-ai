// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDeQeIA3PCuZpUeCuR6Rz2YM_OkJxrjZk",
  authDomain: "library-db-51cc9.firebaseapp.com",
  projectId: "library-db-51cc9",
  storageBucket: "library-db-51cc9.appspot.com",
  messagingSenderId: "284662415745",
  appId: "1:284662415745:web:562a6e802bad5218afe880",
  measurementId: "G-1Y6DRVHQFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
