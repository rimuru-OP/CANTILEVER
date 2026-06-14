const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const registerUser = async(req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;
        
        //check existing user
        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            })
        }

        //password hashed
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        //create USER

        const user = new User({
            username,
            email,
            password: hashedPassword,
        })

        await user.save();

        //create token
        const token = jwt.sign(
            {
                id:user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        //response

        res.status(201).json({
            token,
            user: {
                id:user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err){
        res.status(500).json({
            message: err.message,
        })
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const {
            email, 
            password,
        } = req.body;

        //user
        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        //create token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        //response

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err){
        res.status(500).json({
            message: err.message,
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
};