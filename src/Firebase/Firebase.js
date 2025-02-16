// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1BBKbKVdtU3jGmdo9B3J4EU0wHHCacLI",
  authDomain: "login-49efe.firebaseapp.com",
  projectId: "login-49efe",
  storageBucket: "login-49efe.firebasestorage.app",
  messagingSenderId: "701709371598",
  appId: "1:701709371598:web:c182b4f1ac525780e2689f"
};

// Initialize Firebase

function Firebase() {
    initializeApp(firebaseConfig);
}

export default Firebase;