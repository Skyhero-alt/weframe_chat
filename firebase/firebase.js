// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMbg0vGbBP1A4zhklt5-sNH0s6X1d7AN0",
  authDomain: "weframe-chat.firebaseapp.com",
  projectId: "weframe-chat",
  storageBucket: "weframe-chat.appspot.com",
  messagingSenderId: "383717155717",
  appId: "1:383717155717:web:32e2945f470715285fdaec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { auth, provider };
