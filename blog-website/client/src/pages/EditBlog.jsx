import "../stylesheets/CreateBlog.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import RichTextEditor from "../components/RichTextEditor.jsx";
import API from "../api.js";
import { apiFetch } from "../apiFetch.js";
import { SkeletonPost } from "../components/Skeleton.jsx";

export default function EditBlog() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title,       setTitle]       = useState("");
    const [content,     setContent]     = useState("");
    const [category,    setCategory]    = useState("");
    const [description, setDescription] = useState("");
    const [image,       setImage]       = useState(null);
    const [preview,     setPreview]     = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [error,       setError]       = useState("");
    const [loading,     setLoading]     = useState(true);
    const [submitting,  setSubmitting]  = useState(false);

    useEffect(() => {

        const fetchPost = async () => {
            try {
                const response = await apiFetch(`/api/posts/${id}`);
                const data = await response.json();
                setTitle(data.title       || "");
                setContent(data.content   || "");
                setCategory(data.category || "");
                setDescription(data.description || "");
                setExistingImage(data.image || null);
            } catch (err) {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();

    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {

            const postData = new FormData();

            postData.append("title",       title);
            postData.append("category",    category);
            postData.append("description", description);
            postData.append("content",     content);

            if (image) postData.append("image", image);

            const response = await apiFetch(`/api/posts/${id}`, {
                method: "PUT",
                body: postData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to update post.");
                return;
            }

            navigate(`/posts/${id}`);

        } catch (err) {

            setError("Something went wrong. Please try again.");

        } finally {

            setSubmitting(false);

        }

    };

    if (loading) {
        return (
            <Layout>
                <SkeletonPost />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="create-page">
                <form className="create-form" onSubmit={handleSubmit}>

                    <h1>Edit Post</h1>

                    {error && (
                        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Short Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                    />

                    {(preview || existingImage) && (
                        <img
                            src={preview || `${API}${existingImage}`}
                            alt="Preview"
                            className="edit-preview-image"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </Layout>
    );
}