const Post = require("../models/Post");

const createPost = async (req, res) => {

    try {

        const {
            title,
            category,
            description,
            content,
            image,
        } = req.body;

        const post = new Post({

            title,

            category,

            description,

            content,

            image,

            user: req.user._id,

            author: req.user.username,

        });

        const createdPost = await post.save();

        res.status(201).json(createdPost);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};
const deletePost = async (req, res) => {

    try {

        const post = await Post.findById(
            req.params.id
        );

        /* CHECK POST */

        if (!post) {

            return res.status(404).json({
                message: "Post not found",
            });

        }

        /* CHECK OWNERSHIP */

        if (

            post.user.toString() !==
            req.user._id.toString()

        ) {

            return res.status(401).json({
                message: "Not authorized",
            });

        }

        /* DELETE */

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted",
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};
module.exports = {
    createPost,
};