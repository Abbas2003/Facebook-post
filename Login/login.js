// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCF9mMxQTi8EvR262rE5lHaD-qglagHBY",
  authDomain: "facebook-post-101.firebaseapp.com",
  databaseURL: "https://facebook-post-101-default-rtdb.firebaseio.com",
  projectId: "facebook-post-101",
  storageBucket: "facebook-post-101.appspot.com",
  messagingSenderId: "455194893983",
  appId: "1:455194893983:web:481286f4f326d3a7368caa",
  measurementId: "G-T1SC52DDFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()
const auth = getAuth()

// Global user vars
var email = document.getElementById("email")
var password = document.getElementById("password")
var thanksMsg = document.getElementById("thanksMsg")

window.login = function () {
  var obj = {
    email: email.value,
    password: password.value
  }
  console.log(obj)
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log(res)
      var id = res.user.uid;
      var reference = ref(db, `users/${id}`)
      onValue(reference, function (data) {
        var obj = data.val();
        console.log(obj);
        thanksMsg.innerHTML += `<p class="fw-bold text-success fs-4 mt-2 mb-0 pb-0">Thanks ${obj.userName}. You are successfully login.<p/>`
      })
    })
    .catch(function (err) {
      console.log(err)
    })

}

