import firebase from "firebase/app";

// import { initializeAuth } from "firebase/auth";
import { initializeAuth, updateProfile} from "firebase/auth/cordova";
import { initializeApp } from "firebase/app";


import "firebase/firestore";
import {  getFirestore,  
          collection, 
          addDoc, 
          updateDoc,
          doc,
          setDoc,
          getDocs,  
          getDoc,
          deleteDoc,
          writeBatch,
          query, 
          where, 
          orderBy,
          startAt,
          endAt,
          documentId,
          

        } from "firebase/firestore";
// import * as firebase from 'firebase';
// import firebase from "firebase/compat/app";


const firebaseConfig = {
    apiKey: "AIzaSyAEB6pTlTj9_tjGWeWPvN5wxO6n6kaxcE8", 
    authDomain: "inrush-authonly.firebaseapp.com", 
    projectId: "inrush-authonly", 
    storageBucket: "inrush-authonly.appspot.com", 
    messagingSenderId: "479116863662", 
    appId: "1:479116863662:web:308831712861f5cf26253f", 
    measurementId: "G-GMC95BDDL7" 
  };
  

  // firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);


const db = getFirestore(app);

export { app, db, auth, 
        getFirestore, collection, addDoc, getDocs, deleteDoc,
        query, where, orderBy, startAt, endAt,
        updateDoc, doc, setDoc, writeBatch, documentId
      };