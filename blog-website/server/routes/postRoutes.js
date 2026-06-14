const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");

// get all posts
router.get("/", async (req, res)=>{
    try{
        const posts = await Post.find();
        if(!posts){
            return res.status(404).json({
                message: "posts not found",
            })
        }
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
    catch{
        res.status(500).json({
            message: error.message,
        });
    }
})

//create post
router.post("/", async (req, res) => {
    try {
        const post = new Post(req.body);
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    }
    catch (error){
        res.status(400).json({
            message: error.message,
        })
    }
})
module.exports = router;