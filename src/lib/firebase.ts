"use client"; // Needed if using Firebase in client components

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// ✅ Updated Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzLf4cMiMjD9fM4u_A1WWvRXb4YXQmvMM",
  authDomain: "siddesh-b.firebaseapp.com",
  projectId: "siddesh-b",
  storageBucket: "siddesh-b.firebasestorage.app",
  messagingSenderId: "879897909822",
  appId: "1:879897909822:web:5413dd95f9b2c1419a0f6f",
  measurementId: "G-3VJ94GRR3X",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize analytics only in the browser
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Firestore instance (optional, if you use Firestore)
const db = getFirestore(app);

export { app, analytics, db };
