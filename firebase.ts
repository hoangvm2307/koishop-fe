
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmwhJcV6j12Zgib7yKtIADug1uBf6054",
  authDomain: "koishop-bbfd8.firebaseapp.com",
  projectId: "koishop-bbfd8",
  storageBucket: "koishop-bbfd8.appspot.com",
  messagingSenderId: "246442154816",
  appId: "1:246442154816:web:78e3a5e95688c6ea4938a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };