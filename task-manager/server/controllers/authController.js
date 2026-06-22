const jwt = require("jsonwebtoken");
const User = require("../models/User");

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

function signToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

// POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);

        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken(user._id);

        res.cookie("token", token, COOKIE_OPTIONS);
        res.json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.json({ message: "Logged out" });
};

// GET /api/auth/me
exports.me = (req, res) => {
    // req.user is set by authMiddleware
    res.json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        },
    });
};
