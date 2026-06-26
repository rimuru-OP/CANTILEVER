const cloudinary = require("../config/cloudinary");

const UPLOAD_FOLDER = "blog-posts";

/**
 * Uploads an in-memory file buffer (from multer.memoryStorage) to Cloudinary.
 * Returns { url, publicId } on success.
 */
const uploadBufferToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: UPLOAD_FOLDER,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        );

        uploadStream.end(buffer);
    });
};

/**
 * Deletes an asset from Cloudinary by its public_id.
 * Safe to call with a falsy publicId (no-op).
 */
const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error("Cloudinary delete failed:", err.message);
    }
};

module.exports = {
    uploadBufferToCloudinary,
    deleteFromCloudinary,
};