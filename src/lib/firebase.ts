// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAglM6knOwzadmce5_y8UIvpTXrxkIfbXU",
  authDomain: "bindassticks-store.firebaseapp.com",
  projectId: "bindassticks-store",
  storageBucket: "bindassticks-store.firebasestorage.app",
  messagingSenderId: "767788070076",
  appId: "1:767788070076:web:3bd5e2edfe763062f38cb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);