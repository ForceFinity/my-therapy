import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCx31oQvmShsm2qcQazgqYoK5s7FlfN4Po",
    authDomain: "mytherapy-414421.firebaseapp.com",
    projectId: "mytherapy-414421",
    storageBucket: "mytherapy-414421.appspot.com",
    messagingSenderId: "94891164296",
    appId: "1:94891164296:web:39dd5240950ff7a92d153d",
    measurementId: "G-810T55GJ9L"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
