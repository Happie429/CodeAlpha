const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ===========================
// Connect MongoDB
// ===========================
connectDB();

// ===========================
// Middleware
// ===========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===========================
// Static Files
// ===========================

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
console.log(path.join(__dirname, "uploads"));


// ===========================
// API Routes
// ===========================
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// ===========================
// Home Route
// ===========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running at http://localhost:${PORT}`);
});