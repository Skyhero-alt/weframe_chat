// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6z8pHPnHGuMzmjGCaRtgXAGcE2Vx0YO4",
  authDomain: "weframe-chat-30adf.firebaseapp.com",
  projectId: "weframe-chat-30adf",
  storageBucket: "weframe-chat-30adf.appspot.com",
  messagingSenderId: "67082767672",
  appId: "1:67082767672:web:5666d9f3eef8271ea385cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { auth, provider };
