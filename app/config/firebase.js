// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYE0ScNS08xkmlaJUf1ZVu8-oFfFxUd_Q",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "voodoo-8900f",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("🔥 Firebase initialized successfully");

export default app;  // ✅ Add this line