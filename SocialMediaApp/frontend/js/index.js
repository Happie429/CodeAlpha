// =======================================
// CHECK LOGIN
// =======================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// =======================================
// GET USER
// =======================================

let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// =======================================
// HTML ELEMENTS
// =======================================

const welcomeUser = document.getElementById("welcomeUser");

const profileName = document.getElementById("profileName");

const profileUsername = document.getElementById("profileUsername");

const profileBio = document.getElementById("profileBio");

const profilePic = document.getElementById("profilePic");

const homePosts = document.getElementById("homePosts");

const homeFollowers = document.getElementById("homeFollowers");

const homeFollowing = document.getElementById("homeFollowing");

// =======================================
// LOAD PROFILE
// =======================================

async function loadProfile() {
    console.log("User from API:", data.user);
console.log("Profile Pic:", data.user.profilePic);

    try {

        const response = await fetch(
            `http://localhost:5000/api/users/profile/${user._id || user.id}`
        );

        const data = await response.json();

        if (!data.success) {
            return;
        }

        user = data.user;

localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);

        if (welcomeUser)
            welcomeUser.innerHTML = `👋 ${user.name}`;

        if (profileName)
            profileName.innerHTML = user.name;

        if (profileUsername)
            profileUsername.innerHTML = "@" + user.username;

        if (profileBio)
            profileBio.innerHTML = user.bio || "No Bio";

        if (homeFollowers)
            homeFollowers.innerHTML = user.followers.length;

        if (homeFollowing)
            homeFollowing.innerHTML = user.following.length;
        
if (homePosts)
    homePosts.innerHTML = user.posts ? user.posts.length : 0;

      if (profilePic) {
    if (data.user.profilePic && data.user.profilePic !== "") {
        profilePic.src =
            `http://localhost:5000${data.user.profilePic}?t=${Date.now()}`;
    } else {
        profilePic.src = "https://i.pravatar.cc/150";
    }
}
    }

    catch (err) {

        console.log(data.user);

    }

}
// =======================================
// LOGOUT
// =======================================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}

document
.getElementById("logoutBtn")
.addEventListener("click", logout);

const logoutSide = document.getElementById("logoutSide");

if (logoutSide) {
    logoutSide.addEventListener("click", logout);
}


// =======================================
// CREATE POST
// =======================================

const postForm = document.getElementById("postForm");

if (postForm) {

    postForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const caption = document
            .getElementById("caption")
            .value
            .trim();

        if (!caption) {

            alert("Write something first!");

            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts/create",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        userId: user._id || user.id,

                        caption: caption

                    })

                }
            );

            const data = await response.json();

            alert(data.message);

            document.getElementById("caption").value = "";

            loadPosts();

        }

        catch (err) {

            console.log(err);

        }

    });

}
// =======================================
// LOAD POSTS
// =======================================

async function loadPosts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/posts"
        );

        const data = await response.json();

        const container =
            document.getElementById("postsContainer");

        container.innerHTML = "";

        data.posts.forEach(post => {

            container.innerHTML += `

<div class="post">

    <div class="post-header">

        <div class="post-user">

            <img
                class="avatar"
                src="${
                    post.user.profilePic
                    ? "http://localhost:5000" + post.user.profilePic
                    : "https://i.pravatar.cc/150"
                }"
            >

            <div class="user-info">

                <h3>${post.user.name}</h3>

                <p>@${post.user.username}</p>

            </div>

        </div>

    </div>

    <div class="post-content">

        ${post.caption}

    </div>

    <div class="post-actions">

        <button
            class="action-btn"
            onclick="likePost('${post._id}')">

            ❤️ ${post.likes.length}

        </button>

        <button
            class="action-btn"
            onclick="commentPost('${post._id}')">

            💬 ${post.comments.length}

        </button>

        <button class="action-btn">

            📤

        </button>

        <button class="action-btn">

            🔖

        </button>

    </div>

    <div
        id="comments-${post._id}"
        class="comments-box">

    </div>

</div>

`;

            loadComments(post._id);

        });

    }

    catch (err) {

        console.log(err);

    }

}

// =======================================
// LIKE POST
// =======================================

async function likePost(postId) {

    try {

        await fetch(

            `http://localhost:5000/api/posts/like/${postId}`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    userId: user._id || user.id

                })

            }

        );

        loadPosts();

    }

    catch (err) {

        console.log(err);

    }

}

// =======================================
// COMMENT POST
// =======================================

async function commentPost(postId) {

    const text = prompt("Write your comment");

    if (!text) return;

    try {

        const response = await fetch(

            `http://localhost:5000/api/comments/${postId}`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    userId: user._id || user.id,

                    text

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        loadPosts();

    }

    catch (err) {

        console.log(err);

    }

}

// =======================================
// LOAD COMMENTS
// =======================================

async function loadComments(postId) {

    try {

        const response = await fetch(

            `http://localhost:5000/api/comments/${postId}`

        );

        const data = await response.json();

        const box =
            document.getElementById(`comments-${postId}`);

        if (!box) return;

        box.innerHTML = "";

        data.comments.forEach(comment => {

            box.innerHTML += `

<div class="single-comment">

<b>${comment.user.name}</b>

<p>${comment.text}</p>

</div>

`;

        });

    }

    catch (err) {

        console.log(err);

    }

}
// =======================================
// DARK MODE
// =======================================

const darkBtn = document.getElementById("darkBtn");

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            darkBtn.innerHTML = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            darkBtn.innerHTML = "🌙";

        }

    });

}

const theme = localStorage.getItem("theme");

if (theme === "dark") {

    document.body.classList.add("dark");

    if (darkBtn) {
        darkBtn.innerHTML = "☀️";
    }

}

// =======================================
// SEARCH POSTS
// =======================================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        document.querySelectorAll(".post").forEach(post => {

            const name = post.querySelector(".user-info h3")
                .innerText
                .toLowerCase();

            if (name.includes(value)) {

                post.style.display = "block";

            } else {

                post.style.display = "none";

            }

        });

    });

}

// =======================================
// FOLLOW BUTTON
// =======================================

document.querySelectorAll(".suggestion button").forEach(btn => {

    btn.addEventListener("click", () => {

        if (btn.innerText === "Follow") {

            btn.innerText = "Following";
            btn.style.background = "green";

        } else {

            btn.innerText = "Follow";
            btn.style.background = "#0095f6";

        }

    });

});

// =======================================
// SHARE POST
// =======================================

document.addEventListener("click", (e) => {

    if (e.target.innerText.includes("📤")) {

        navigator.clipboard.writeText(window.location.href);

        alert("Post Link Copied!");

    }

});

// =======================================
// SAVE POST
// =======================================

document.addEventListener("click", (e) => {

    if (e.target.innerText.includes("🔖")) {

        alert("Post Saved");

    }

});

// =======================================
// AUTO REFRESH PROFILE
// =======================================

setInterval(() => {

    loadProfile();

}, 5000);

// =======================================
// AUTO REFRESH POSTS
// =======================================

setInterval(() => {

    loadPosts();

}, 10000);

// =======================================
// PAGE LOAD
// =======================================

window.onload = () => {

    loadProfile();

    loadPosts();

};

console.log("✅ Ime Social Media Loaded Successfully");