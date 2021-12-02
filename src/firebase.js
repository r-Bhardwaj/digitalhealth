// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore ,doc,setDoc,getDoc,getDocs,query,where} from "firebase/firestore";
import { getStorage, ref,uploadBytes,getDownloadURL,getMetadata } from "firebase/storage";

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth"
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCquYrSYWrvV5J-ApDmGNutXQetudoiBBk",
  authDomain: "pthome-c2345.firebaseapp.com",
  projectId: "pthome-c2345",
  storageBucket: "pthome-c2345.appspot.com",
  messagingSenderId: "288341971428",
  appId: "1:288341971428:web:699add5071578b8b8eb7f1",
  measurementId: "G-D9RYSMTF2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db = getFirestore();
const storage = getStorage();

export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,storage,ref,uploadBytes,db,doc,setDoc,getDoc,getDocs,collection,query,where,getDownloadURL,getMetadata};