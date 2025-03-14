import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5IT1qTLATicYwbd4cBjP0Lj9RZiWBTKY",
  authDomain: "login-ea634.firebaseapp.com",
  projectId: "login-ea634",
  storageBucket: "login-ea634.firebasestorage.app",
  messagingSenderId: "548000421830",
  appId: "1:548000421830:web:94be3a84edcbdc2a8e44c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Firebase() {
    initializeApp(firebaseConfig);
}

const db = getFirestore(app)


export default Firebase
export {db}