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
var userPost = document.getElementById("userPost")
var arrayOfData = [];


// Getting data from db
function retrieveData() {
  const reference = ref(db, "All Post/")
  onValue(reference, function (data) {
    console.log(data.val())
    if (data.val()) {
      arrayOfData = Object.values(data.val())
    }
    createPost(arrayOfData)
    console.log("Array of data ", arrayOfData)
  })
}
retrieveData()


function createPost() {
  for (var i = 0; i < arrayOfData.length; i++) {
    var obj = arrayOfData[i]
    console.log(obj.id)

    userPost.innerHTML += ` <div class="mb-3 bg-white rounded shadow">
    <div class="p-3 d-flex align-items-center">
        <img width="50px" class="rounded-pill" src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="">
        <div class="p-2">
            <h5 class="mb-0 fw-bold">${obj.userName}</h5>
            <p class="mb-0 text-muted date">${obj.shareDate}</p>
        </div>
    </div>
    <div class='px-3 py-2'>
      <p>${obj.postText}</p>
    </div>
    <img src="${obj.imgURL}" width="100%" alt="">            
    <div class="ps-3 pe-3">
    <hr>
    <div class="d-flex justify-content-between">
      <button class="border-0 bg-body">
        <i class="fa-regular fa-thumbs-up"></i>
        <span>Like</span>
      </button>
      <button class="border-0 bg-body">
        <i class="fa-regular fa-comment"></i>
        <span>Comment</span>
      </button>
      <button class="border-0 bg-body">
        <i class="fa-solid fa-share"></i>
        <span>Share</span>
      </button>
    </div>
  </div>
    <div class="p-3 d-flex">
        <button onclick="DeletePost('${obj.id}')" class='w-100 btn btn-danger'>Delete</button>
    </div>
</div>`;


  }

}
createPost()


window.DeletePost = function (id) {
  var reference = ref(db, `All Post/${id}`);
  remove(reference);
};
