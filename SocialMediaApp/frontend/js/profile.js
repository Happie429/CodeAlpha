// ======================================
// CHECK LOGIN
// ======================================

let user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!token || !user) {
    window.location.href = "login.html";
}

// ======================================
// HTML ELEMENTS
// ======================================

const profilePreview = document.getElementById("profilePreview");
const profileInput = document.getElementById("profileInput");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const editProfileBtn = document.getElementById("editProfileBtn");

const userName = document.getElementById("userName");
const userUsername = document.getElementById("userUsername");
const userBio = document.getElementById("userBio");

const postsCount = document.getElementById("postsCount");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");

// ======================================
// LOAD PROFILE
// ======================================

async function loadProfile() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/users/profile/${user._id || user.id}`
        );

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        user = data.user;

        localStorage.setItem("user", JSON.stringify(user));

        userName.textContent = user.name;
        userUsername.textContent = "@" + user.username;
        userBio.textContent = user.bio || "No Bio";

        followersCount.textContent = user.followers.length;
        followingCount.textContent = user.following.length;

        if (postsCount) {
            postsCount.textContent = user.posts ? user.posts.length : 0;
        }

        if (user.profilePic) {
            profilePreview.src =
                "http://localhost:5000" + user.profilePic;
        } else {
            profilePreview.src =
                "https://i.pravatar.cc/200";
        }

    } catch (err) {
        console.log(err);
    }

}

// ======================================
// EDIT PROFILE
// ======================================

editProfileBtn.addEventListener("click", async () => {

    const newName = prompt("Enter Name", user.name);
    if (newName === null) return;

    const newUsername = prompt("Enter Username", user.username);
    if (newUsername === null) return;

    const newBio = prompt("Enter Bio", user.bio || "");
    if (newBio === null) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/users/profile/${user._id || user.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newName,
                    username: newUsername,
                    bio: newBio
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            user = data.user;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            await loadProfile();

            alert("Profile Updated Successfully");

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

});

// ======================================
// CHANGE PROFILE PHOTO
// ======================================

changePhotoBtn.addEventListener("click", () => {
    profileInput.click();
});

profileInput.addEventListener("change", async () => {

    const file = profileInput.files[0];

    if (!file) return;

    profilePreview.src = URL.createObjectURL(file);

    const formData = new FormData();

    formData.append("profilePic", file);

    try {

        const response = await fetch(
            `http://localhost:5000/api/users/upload-profile/${user._id || user.id}`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            user = data.user;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            profilePreview.src =
                "http://localhost:5000" +
                user.profilePic;

            await loadProfile();

            alert("Profile Picture Updated Successfully");

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

    }

});


// ======================================
// PAGE LOAD
// ======================================

window.onload = () => {
    loadProfile();
};
;