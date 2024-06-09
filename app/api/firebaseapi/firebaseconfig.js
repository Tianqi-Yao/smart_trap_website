// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "smarttrapproject-40340.firebaseapp.com",
    databaseURL: "https://smarttrapproject-40340-default-rtdb.firebaseio.com",
    projectId: "smarttrapproject-40340",
    storageBucket: "smarttrapproject-40340.appspot.com",
    messagingSenderId: "1037384951311",
    appId: "1:1037384951311:web:b0d06f53a3849ed151257a",
    measurementId: "G-SJHJRJHSRE"
};

const app = initializeApp(firebaseConfig);

export {app};