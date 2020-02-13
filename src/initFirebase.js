import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import config from "./firebaseConfig.js";

function initFirebase() {
  firebase.initializeApp(config);
  const db = firebase.firestore();
  return { db };
}

const { db } = initFirebase();

export { db };
