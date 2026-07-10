const express = require("express");
const router = express.Router();

const {
    addComment,
    getComments
} = require("../controllers/commentController");

// Add Comment
router.post("/:postId", addComment);

// Get Comments
router.get("/:postId", getComments);

module.exports = router;