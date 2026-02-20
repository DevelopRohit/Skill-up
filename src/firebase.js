import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl_GW7pgJ9XWZbZ96ohwoBPAyhLLjTglw",
    authDomain: "skill-up-backend.firebaseapp.com",
    projectId: "skill-up-backend",
    storageBucket: "skill-up-backend.firebasestorage.app",
    messagingSenderId: "841824913921",
    appId: "1:841824913921:web:b27e70238db69f9f7f4e00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 ADD THIS
export const db = getFirestore(app);

// 🔥 AUTH
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();