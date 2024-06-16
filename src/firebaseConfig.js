// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUR6B09b9S6_IzpuSa5zSf88WDFnJ8UjI",
  authDomain: "organize-mind.firebaseapp.com",
  projectId: "organize-mind",
  storageBucket: "organize-mind.appspot.com",
  messagingSenderId: "1094252810703",
  appId: "1:1094252810703:web:787d27a7ee30d5c13f82ba",
  measurementId: "G-5JSXYWPK3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
