const Post = require("../models/Post");
const {validationResult} = require('express-validator');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryUpload");
/* =========================
   CREATE POST
========================= */
const createPost = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {

        const {
            title,
            category,
            description,
            content,
        } = req.body;

        let image = "";
        let imagePublicId = "";

        if (req.file) {
            const uploaded = await uploadBufferToCloudinary(req.file.buffer);
            image = uploaded.url;
            imagePublicId = uploaded.publicId;
        }

        const post = new Post({
            title,
            category,
            description,
            content,
            image,
            imagePublicId,
            user: req.user._id,
        });

        const createdPost = await post.save();

        res.status(201).json(createdPost);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

/* =========================
   DELETE POST
========================= */
// FIX: removed the entire second copy of deletePost that was
// incorrectly nested inside this function after the try/catch block.
const deletePost = async (req, res) => {
    
    try {

        const post = await Post.findById(req.params.id);

        /* CHECK POST */

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        /* CHECK OWNERSHIP */

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        /* DELETE */
        if (post.imagePublicId) {
            await deleteFromCloudinary(post.imagePublicId);
        }
        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted",
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};

/* =========================
   UPDATE POST
========================= */
const updatePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        /* CHECK POST */

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        /* CHECK OWNERSHIP */

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        /* UPDATE FIELDS */

        post.title       = req.body.title       || post.title;
        post.category    = req.body.category    || post.category;
        post.description = req.body.description || post.description;
        post.content     = req.body.content     || post.content;
        if (req.file) {
            const oldPublicId = post.imagePublicId;
            const uploaded = await uploadBufferToCloudinary(req.file.buffer);
            post.image = uploaded.url;
            post.imagePublicId = uploaded.publicId;

            // Clean up the old asset only after the new one is safely uploaded.
            if (oldPublicId) {
                await deleteFromCloudinary(oldPublicId);
            }
        }
        
        /* SAVE */
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};

module.exports = {
    createPost,
    deletePost,
    updatePost,
};
