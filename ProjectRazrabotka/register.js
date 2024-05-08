// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {  getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {  getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgRLziFQk8demE-ntnjpU3MeAlBk74ASU",
  authDomain: "razrabotka-e14dc.firebaseapp.com",
  databaseURL: "https://razrabotka-e14dc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "razrabotka-e14dc",
  storageBucket: "razrabotka-e14dc.appspot.com",
  messagingSenderId: "236455877056",
  appId: "1:236455877056:web:328db7722b86c65b231025",
  measurementId: "G-08XMSKDGJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const RegForm = document.getElementById("register-form");
const RegFName = document.getElementById("register-first-name");
const RegLName = document.getElementById("register-last-name");
const RegEmail = document.getElementById("register-email");
const RegPassword = document.getElementById("register-password");
const RegSubmit = document.getElementById("register-submit-btn");

let RegisterUser = evt => {
  evt.preventDefault();

  createUserWithEmailAndPassword(auth, RegEmail.value, RegPassword.value)
  .then((credentials) => {
    set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
      firstname: RegFName.value,
      lastname: RegLName.value
    })
  })
  .catch((error) => {
    alert(error.code);
    alert(error.message);
  })
}

RegForm.addEventListener('submit', RegisterUser)