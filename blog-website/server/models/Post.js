const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(  
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        // Cloudinary public_id for the uploaded image, used to delete/replace
        // the asset on Cloudinary later. Empty for posts with no image.
        imagePublicId: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true,
    }

);

module.exports = mongoose.model (
    "Post",
    postSchema
);