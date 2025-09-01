// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMT_1Ryp-xQbZGfCkWovfY7ar22ZFc3f8",
  authDomain: "quickbites-ad993.firebaseapp.com",
  projectId: "quickbites-ad993",
  storageBucket: "quickbites-ad993.firebasestorage.app",
  messagingSenderId: "1033111470550",
  appId: "1:1033111470550:web:842bf49d75688750482477",
  measurementId: "G-X4209M9H5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);