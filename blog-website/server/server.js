const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const fs = require("fs");

dotenv.config();
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET is not set in .env");
    process.exit(1);
}

if (!process.env.MONGO_URI) {
    console.error("FATAL: MONGO_URI is not set in .env");
    process.exit(1);
}

if(!process.env.CLIENT_URL){
    console.error("FATAL: CLIENT_URL not set in .env");
    process.exit(1);
}
/* =========================
   DATABASE
========================= */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));
/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

/* =========================
   START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
