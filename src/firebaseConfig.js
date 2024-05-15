// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoLo2z8-rTVS14owIG7efPuUCB2VORSz8",
  authDomain: "intellicourse-ai.firebaseapp.com",
  projectId: "intellicourse-ai",
  storageBucket: "intellicourse-ai.appspot.com",
  messagingSenderId: "132249545271",
  appId: "1:132249545271:web:a1d3fd40e7583b583eedb2",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
