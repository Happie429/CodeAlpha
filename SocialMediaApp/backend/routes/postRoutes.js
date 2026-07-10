const express = require("express");
const router = express.Router();

const {
    createPost,
    getPosts,
    likePost
} = require("../controllers/postController");

// Create a new post
router.post("/create", createPost);

// Get all posts
router.get("/", getPosts);

// Like a post
router.post("/like/:postId", likePost);

module.exports = router;