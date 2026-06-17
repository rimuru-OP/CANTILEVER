import "../stylesheets/CreateBlog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import API from "../api.js";


export default function CreateBlog() {

    const [title,       setTitle]       = useState("");
    const [content,     setContent]     = useState("");
    const [category,    setCategory]    = useState("");
    const [description, setDescription] = useState("");
    const [error,       setError]       = useState("");
    const [submitting,  setSubmitting]  = useState(false);

    const navigate = useNavigate();

    /* =========================
       CREATE POST
    ========================= */
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    content,
                }),
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
                        <p style={{ color: "red", marginBottom: "1rem" }}>
                            {error}
                        </p>
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

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Publishing..." : "Create Post"}
                    </button>

                </form>
            </div>
        </Layout>
    );
}
