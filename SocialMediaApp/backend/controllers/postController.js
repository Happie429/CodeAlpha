const Post = require("../models/Post");

// ==========================
// Create Post
// ==========================
const createPost = async (req, res) => {
    try {
        const { userId, caption } = req.body;

        if (!userId || !caption) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const newPost = await Post.create({
            user: userId,
            caption
        });

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post: newPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================
// Get All Posts
// ==========================
const getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("user", "name username profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Export Functions
// ==========================
module.exports = {
    createPost,
    getPosts
};

// ==========================
// Like Post
// ==========================
const likePost = async (req, res) => {

    try {

        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(postId);

        if (!post) {

            return res.status(404).json({
                success: false,
                message: "Post not found"
            });

        }

        if (post.likes.includes(userId)) {

            return res.status(400).json({
                success: false,
                message: "Already liked"
            });

        }

        post.likes.push(userId);

        await post.save();

        res.status(200).json({

            success: true,
            message: "Post liked successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
module.exports = {
    createPost,
    getPosts,
    likePost
};