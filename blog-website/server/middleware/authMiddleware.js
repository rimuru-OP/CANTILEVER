const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* =========================
   PROTECT MIDDLEWARE
========================= */
// FIX: The original had a subtle flow issue — it called next() inside
// the if-block but then the "no token" check ran AFTER it as a
// separate statement. This works by accident (token is set so
// the check is false) but is confusing and fragile.
//
// New pattern: check for missing header first and return early,
// then verify in a clean try/catch. No ambiguity.
const protect = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    try {

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User no longer exists",
            });
        }

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Not authorized, invalid token",
        });

    }

};

module.exports = protect;
