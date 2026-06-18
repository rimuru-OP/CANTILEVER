const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const protect = require("../middleware/authMiddleware.js");
const {body, validationResult} = require('express-validator');
const upload = require("../middleware/uploadMiddleware.js");

const {
    createPost,
    deletePost,
    updatePost,
} = require("../controllers/postController");

// get all posts
router.get("/", async (req, res) => {
    try {
        const page  = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip  = (page - 1) * limit;

        const total = await Post.countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get single post

router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                message: "post not found",
            })
        }
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
})

//create post
router.post("/", protect,
    upload.single("image"),
    [
        body('title').trim().notEmpty().isLength({ max: 200 }),
        body('content').notEmpty(),
        body('category').trim().notEmpty(),
    ]
    ,createPost);

//delete post
router.delete("/:id", protect, deletePost);

//update post
router.put(
    "/:id",
    protect,
    upload.single("image"),
    updatePost,
);
module.exports = router;