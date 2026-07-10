const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
    // User who created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Caption
    caption: {
        type: String,
        required: true,
        trim: true
    },

    // Optional image URL
    image: {
        type: String,
        default: ""
    },

    // Likes
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    // Comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);