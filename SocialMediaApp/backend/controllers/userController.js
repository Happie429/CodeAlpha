const User = require("../models/User");

// ======================================
// Get User Profile
// ======================================
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .select("-password")
            .populate("followers", "name username profilePic")
            .populate("following", "name username profilePic");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// Update Profile
// ======================================
const updateProfile = async (req, res) => {

    try {

        const { name, username, bio } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name) {
            user.name = name;
        }

        if (username) {
            user.username = username;
        }

        if (bio) {
            user.bio = bio;
        }

        // Upload Profile Picture
        if (req.file) {
            user.profilePic = `/uploads/${req.file.filename}`;
        }

        await user.save();

        const updatedUser = await User.findById(req.params.id)
            .select("-password");

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Upload Profile Picture
// ======================================
// ======================================
// Upload Profile Picture
// ======================================

const uploadProfileImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select image"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.profilePic = "/uploads/" + req.file.filename;

        await user.save();

        res.json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage
};