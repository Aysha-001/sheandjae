// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoE5Mz4WmGQqPORN-Qx899VZmKzG5Dxlo",
  authDomain: "sheandjae.firebaseapp.com",
  projectId: "sheandjae",
  storageBucket: "sheandjae.firebasestorage.app",
  messagingSenderId: "308238499495",
  appId: "1:308238499495:web:2fbc7076bc45578492e582",
  measurementId: "G-JJH1LF3F49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
