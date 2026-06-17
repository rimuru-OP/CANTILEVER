const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const protect = require("../middleware/authMiddleware.js");
const {body, validationResult} = require('express-validator');
const {
    createPost,
    deletePost,
    updatePost,
} = require("../controllers/postController");

// get all posts
router.get("/", async (req, res)=>{
    try{
        const posts = await Post.find().sort({ createdAt: -1 });;
        res.status(200).json(posts);
    }
    catch (error){
        res.status(500).json({
            message: error.message,
        })
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
    [
        body('title').trim().notEmpty().isLength({ max: 200 }),
        body('content').notEmpty(),
        body('category').trim().notEmpty(),
        body('image').optional().isURL(),
    ]
    ,createPost);

//delete post
router.delete("/:id", protect, deletePost);

//update post
router.put("/:id", protect, updatePost);
module.exports = router;