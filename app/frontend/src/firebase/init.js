// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT46I8grUBMZaUXb32qcyBmHnP9zttxI8",
  authDomain: "coupleexpensebalancer.firebaseapp.com",
  projectId: "coupleexpensebalancer",
  storageBucket: "coupleexpensebalancer.appspot.com",
  messagingSenderId: "521283810639",
  appId: "1:521283810639:web:036537e30ba4cc4c16013a",
  measurementId: "G-687ZN9FEB3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export default db;