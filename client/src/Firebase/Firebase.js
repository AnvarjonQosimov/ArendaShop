import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5IT1qTLATicYwbd4cBjP0Lj9RZiWBTKY",
  authDomain: "login-ea634.firebaseapp.com",
  projectId: "login-ea634",
  storageBucket: "login-ea634.firebasestorage.app",
  messagingSenderId: "548000421830",
  appId: "1:548000421830:web:94be3a84edcbdc2a8e44c7"
};

function Firebase() {
  initializeApp(firebaseConfig);
}

const app = Firebase();
const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default Firebase
export {db}