const Comment = require("../models/Comment");
const Post = require("../models/Post");

// ==============================
// Add Comment
// ==============================
const addComment = async (req, res) => {
    try {

        const { userId, text } = req.body;
        const { postId } = req.params;

        if (!userId || !text) {
            return res.status(400).json({
                success: false,
                message: "Please enter a comment"
            });
        }

        // Create Comment
        const comment = await Comment.create({
            user: userId,
            post: postId,
            text
        });

        // Add comment to post
        await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: comment._id
            }
        });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==============================
// Get Comments of a Post
// ==============================
const getComments = async (req, res) => {

    try {

        const { postId } = req.params;

        const comments = await Comment.find({
            post: postId
        }).populate("user", "name username");

        res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addComment,
    getComments
};