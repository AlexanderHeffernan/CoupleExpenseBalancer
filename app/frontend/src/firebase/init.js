import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCT46I8grUBMZaUXb32qcyBmHnP9zttxI8",
  authDomain: "coupleexpensebalancer.firebaseapp.com",
  projectId: "coupleexpensebalancer",
  storageBucket: "coupleexpensebalancer.appspot.com",
  messagingSenderId: "521283810639",
  appId: "1:521283810639:web:036537e30ba4cc4c16013a",
  measurementId: "G-687ZN9FEB3"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();