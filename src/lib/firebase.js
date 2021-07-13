import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC2zwDIT2G2yCnW5ZoKxdy5-di6QYiLelQ",
  authDomain: "react-insta-c.firebaseapp.com",
  projectId: "react-insta-c",
  storageBucket: "react-insta-c.appspot.com",
  messagingSenderId: "427086821062",
  appId: "1:427086821062:web:094dbeab0661c4acb2c9c7",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
