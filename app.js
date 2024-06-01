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
    userDataObj.key = push(ref(db, "All Post")).key
    var reference = ref(db, `All Post/${userDataObj.key}`)
    set(reference, userDataObj)
    
    console.log(userDataObj)
    
    // Setting input fields to be empty
    userName.value = ""
    shareDate.value = ""
    postText.value = ""
    imgURL.value = ""
  }
    
}

var allDataObj = null;
var arrayOfData;
// Getting data from db
function retrieveData(){
  const reference = ref(db, "All Post/")
  onValue(reference, function(data){
      allDataObj = data.val()
      arrayOfData = Object.values(allDataObj)
      createPost(arrayOfData)
      console.log("Array of data ",arrayOfData)
  })
}
retrieveData()

function createPost(arr){
  var userPost = document.getElementById("userPost")
  userPost.innerHTML = ""
  console.log("Arr",arr)

  console.log("Create Post function")

  for(let i=0; i<arr.length; i++){

    // console.log("arr[i]",arr[i])
    console.log("arr[i]",arr[i].postText) // all oky

    var main = document.createElement("div")
    main.setAttribute("class","border shadow p-3 mb-3")

    // Post header Content(img, name, date)
    var headDiv = document.createElement("div")
    headDiv.setAttribute("class","d-flex")

    var uImg = document.createElement("img")
    uImg.setAttribute('src', "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp")
    uImg.setAttribute('alt', "alt")
    uImg.setAttribute('height', "50")
    uImg.setAttribute('class', "rounded-circle")
    headDiv.appendChild(uImg)

    var d = document.createElement("div")
    var uName = document.createElement("p")
    uName.setAttribute("class","ms-2 cursor-pointer mb-0")
    uName.textContent = arr[i].userName
    d.appendChild(uName)

    var pDate = document.createElement("p")
    pDate.textContent = arr[i].shareDate
    pDate.setAttribute("class","mb-1 ms-2 text-muted date")
    d.appendChild(pDate)
    headDiv.appendChild(d)
    main.appendChild(headDiv)

    // // Post content
    var content = document.createElement("p")
    content.textContent = arr[i].postText   // masla yhn ha
    content.setAttribute('class',"p-3")
    main.appendChild(content)

    // // Post Image
    var pImg = document.createElement("img")
    pImg.setAttribute('src',`${arr[i].imgURL}`)
    pImg.setAttribute('alt',"Alt text")
    pImg.setAttribute('class',"img-fluid img-thumbnail")
    main.appendChild(pImg)

    // // Post footer
    var foot = document.createElement("footer")
    foot.innerHTML += `<div>
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
  </div>`
    foot.setAttribute("class","px-3 py-2")
    main.appendChild(foot)

    // Appended main-div into HTML tag
    userPost.appendChild(main)
    
  }

}

createPost(arrayOfData)