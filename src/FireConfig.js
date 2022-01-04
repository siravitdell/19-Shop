// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABEPoidVDwxHPZD2SiphLwrSAoGKR1fLU",
  authDomain: "shop-bcb6a.firebaseapp.com",
  projectId: "shop-bcb6a",
  storageBucket: "shop-bcb6a.appspot.com",
  messagingSenderId: "1032021578923",
  appId: "1:1032021578923:web:746a6f34918c3f859f93ee",
  measurementId: "G-3VXE1P0VHM",
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db;

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export default firebaseApp;