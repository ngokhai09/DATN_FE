import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5XaAiuwKor9oKmft5hedpYzBY_oTndJE",
    authDomain: "mxhmd6.firebaseapp.com",
    projectId: "mxhmd6",
    storageBucket: "mxhmd6.appspot.com",
    messagingSenderId: "706230893482",
    appId: "1:706230893482:web:570e07198605e9767989d3",
    measurementId: "G-SH4GQNXXW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
