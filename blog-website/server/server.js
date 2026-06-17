const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes/authRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

/* =========================
   ENV GUARDS
   Crash fast and loud if critical env vars are missing
   instead of failing silently at runtime.
========================= */
if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET is not set in .env");
    process.exit(1);
}

if (!process.env.MONGO_URI) {
    console.error("FATAL: MONGO_URI is not set in .env");
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

// FIX: was app.use(cors()) which allows every origin.
// Now restricted to CLIENT_URL in production, falls back
// to localhost:5173 for local dev so nothing breaks.
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

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
// FIX: was hardcoded 5000. Read from .env so it's configurable.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
