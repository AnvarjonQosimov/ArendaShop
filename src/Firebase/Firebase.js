// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5IT1qTLATicYwbd4cBjP0Lj9RZiWBTKY",
  authDomain: "login-ea634.firebaseapp.com",
  projectId: "login-ea634",
  storageBucket: "login-ea634.firebasestorage.app",
  messagingSenderId: "548000421830",
  appId: "1:548000421830:web:94be3a84edcbdc2a8e44c7"
};

// Initialize Firebase

function Firebase() {
    initializeApp(firebaseConfig);
}

export default Firebase;