// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8U9mNCimWndXLb6Sb_HWS8u3N5mkZUbY",
  authDomain: "fyp-civic-connect.firebaseapp.com",
  projectId: "fyp-civic-connect",
  storageBucket: "fyp-civic-connect.firebasestorage.app",
  messagingSenderId: "286323631195",
  appId: "1:286323631195:web:9fdf630ab256636933cb7e",
  measurementId: "G-Y4PVXDRKSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Analytics (browser only)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

const storage = getStorage(app); // ✅ initialize storage

// Export them
export { app, db, auth, analytics, storage };
