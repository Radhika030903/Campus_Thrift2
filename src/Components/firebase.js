// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCXAp1JCV3jSL-_Q1GGIRjtChNolON_5YQ",
  authDomain: "campusthrift-83af1.firebaseapp.com",
  projectId: "campusthrift-83af1",
  storageBucket: "campusthrift-83af1.appspot.com",
  messagingSenderId: "1076140509506",
  appId: "1:1076140509506:web:a7b0036b4218944a2960db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services
export { auth, db };
