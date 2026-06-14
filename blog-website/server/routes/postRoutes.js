const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const protect = require("../middleware/authMiddleware.js");
const {
    createPost,
} = require("../controllers/postController");

// get all posts
router.get("/", async (req, res)=>{
    try{
        const posts = await Post.find();
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
router.post("/", protect, createPost);

module.exports = router;