import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCLdq4y99kNogzy3SCSTSd_5OikIrmYUzk",
  authDomain: "proof-of-attendance.firebaseapp.com",
  projectId: "proof-of-attendance",
  storageBucket: "proof-of-attendance.appspot.com",
  messagingSenderId: "137177721599",
  appId: "1:137177721599:web:8ff8987a60a0dcee2b7aca"
};

firebase.initializeApp(firebaseConfig);
// console.log('firebase', firebase);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const FirebaseStorage = firebase.storage();
// console.log('FirebaseStorage', FirebaseStorage);