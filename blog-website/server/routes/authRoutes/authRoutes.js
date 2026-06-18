const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
    registerUser,
    loginUser,
} = require("../../controllers/authController.js");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                   // max 20 requests per IP
    message: {
        message: "Too many attempts, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/register", authLimiter, registerUser);
router.post("/login",    authLimiter, loginUser);

module.exports = router;