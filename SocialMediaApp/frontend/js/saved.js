// ===============================
// Saved Posts
// ===============================

const savedGrid = document.getElementById("savedGrid");

// Sample Data
let savedPosts = [

{
    id:1,
    image:"https://picsum.photos/500/500?1",
    caption:"Beautiful Sunset 🌅"
},

{
    id:2,
    image:"https://picsum.photos/500/500?2",
    caption:"Nature 🍃"
},

{
    id:3,
    image:"https://picsum.photos/500/500?3",
    caption:"Travel ✈️"
},

{
    id:4,
    image:"https://picsum.photos/500/500?4",
    caption:"Photography 📷"
},

{
    id:5,
    image:"https://picsum.photos/500/500?5",
    caption:"Coffee ☕"
},

{
    id:6,
    image:"https://picsum.photos/500/500?6",
    caption:"Mountains 🏔️"
}

];

// ===============================
// Display Saved Posts
// ===============================

function loadSavedPosts(){

savedGrid.innerHTML="";

savedPosts.forEach(post=>{

savedGrid.innerHTML += `

<div class="saved-card">

<img src="${post.image}">

<div class="overlay">

<h3>${post.caption}</h3>

<div class="buttons">

<button onclick="viewPost(${post.id})">

<i class="fa-solid fa-eye"></i>

View

</button>

<button onclick="removePost(${post.id})">

<i class="fa-solid fa-trash"></i>

Remove

</button>

</div>

</div>

</div>

`;

});

}

loadSavedPosts();


// ===============================
// View Post
// ===============================

function viewPost(id){

const post = savedPosts.find(p=>p.id===id);

alert(post.caption);

}


// ===============================
// Remove Post
// ===============================

function removePost(id){

if(confirm("Remove this post from Saved?")){

savedPosts = savedPosts.filter(post=>post.id!==id);

loadSavedPosts();

}

}