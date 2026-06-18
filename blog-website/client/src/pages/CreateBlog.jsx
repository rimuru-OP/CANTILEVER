import "../stylesheets/CreateBlog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import RichTextEditor from "../components/RichTextEditor.jsx";
import { apiFetch } from "../apiFetch.js";

export default function CreateBlog() {

    const [title,       setTitle]       = useState("");
    const [content,     setContent]     = useState("");
    const [category,    setCategory]    = useState("");
    const [description, setDescription] = useState("");
    const [error,       setError]       = useState("");
    const [submitting,  setSubmitting]  = useState(false);
    const [image,       setImage]       = useState(null);
    const [preview,     setPreview]     = useState(null);
    const navigate = useNavigate();

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

            const response = await apiFetch("/api/posts", {
                method: "POST",
                body: postData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to create post.");
                return;
            }

            navigate(`/posts/${data._id}`);

        } catch (err) {

            setError("Something went wrong. Please try again.");

        } finally {

            setSubmitting(false);

        }

    };

    return (
        <Layout>
            <div className="create-page">
                <form className="create-form" onSubmit={handleSubmit}>

                    <h1>Create Post</h1>

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

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="edit-preview-image"
                        />
                    )}

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Publishing..." : "Create Post"}
                    </button>

                </form>
            </div>
        </Layout>
    );
}