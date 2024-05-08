import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


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


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

const LogForm = document.getElementById("login-form");
const LogEmail = document.getElementById("login-email");
const LogPassword = document.getElementById("login-password");
const LogSubmit = document.getElementById("login-submit-btn");

let SignInUser = evt => {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, LogEmail.value, LogPassword.value)
  .then((credentials) => {
    get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
      if(snapshot.exists){
        sessionStorage.setItem("user-info", JSON.stringify({
          firstname: snapshot.val().firstname,
          lastname: snapshot.val().lastname
        }))
        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
        window.location.href = '../html/index.html';
      }
      else{
        console.log('snapshot doesnt exist')
      }
    })
    console.log(credentials)
  })
  .catch((error) => {
    alert(error.code);
    alert(error.message);
  })
}

LogForm.addEventListener('submit', SignInUser)


