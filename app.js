// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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

// Global user variables
var userName = document.getElementById("userName")
var shareDate = document.getElementById("shareDate")
var postText = document.getElementById("postText")
var imgURL = document.getElementById("imgURL")
var thanksMsg = document.getElementById("thanksMsg")


// Create Post function
window.post = function(){
  if(!(userName.value && shareDate.value && postText.value && imgURL.value)){

    alert("Complete the user data fields") 

  } else {
    var userDataObj = {
      userName: userName.value,
      shareDate: shareDate.value,
      postText: postText.value,
      imgURL: imgURL.value
    }

    // Sending data to DB
    userDataObj.id = push(ref(db, "All Post")).key
    var reference = ref(db, `All Post/${userDataObj.id}`)
    set(reference, userDataObj)
    .then(function(){
      console.log("Data sended successfully")
    })
    .catch(function(err){
      console.log(err, "Error");
    })
    
    thanksMsg.innerHTML += `<p class="fw-bold text-success fs-4 mt-2 mb-0 pb-0">Thanks ${userName.value} for posting<p/>
    <p class="fw-bold text-success fs-4 m-0 p-0">Check your post in the feed<p/>`
    console.log(userDataObj)
    
    // Setting input fields to be empty
    userName.value = ""
    shareDate.value = ""
    postText.value = ""
    imgURL.value = ""
  }
    
}


