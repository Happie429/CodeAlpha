const express = require("express");
const router = express.Router();

const {
    getProfile,
    updateProfile,
    uploadProfileImage
} = require("../controllers/userController");

const upload = require("../middleware/upload");

// Profile
router.get("/profile/:id", getProfile);

// Update Name Username Bio
router.put("/profile/:id", updateProfile);

// Upload Profile Picture
router.post(
    "/upload-profile/:id",
    upload.single("profilePic"),
    uploadProfileImage
);

module.exports = router;