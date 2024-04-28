import { initializeAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
import firebase from "firebase/compat/app";


const firebaseConfig = {
    apiKey: "AIzaSyAEB6pTlTj9_tjGWeWPvN5wxO6n6kaxcE8", 
    authDomain: "inrush-authonly.firebaseapp.com", 
    projectId: "inrush-authonly", 
    storageBucket: "inrush-authonly.appspot.com", 
    messagingSenderId: "479116863662", 
    appId: "1:479116863662:web:308831712861f5cf26253f", 
    measurementId: "G-GMC95BDDL7" 
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
  