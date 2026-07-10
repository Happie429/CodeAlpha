const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder
const uploadPath = path.join(__dirname, "../uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const fileName =
            Date.now() + "-" + Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only Images Allowed"), false);
    }

};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;