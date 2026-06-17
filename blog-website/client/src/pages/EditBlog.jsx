import "../stylesheets/CreateBlog.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import API from "../api.js";

export default function EditBlog() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /* =========================
       FETCH POST
    ========================= */

    useEffect(() => {

        const fetchPost = async () => {

            try {

                const response = await fetch(
                    `${API}/api/posts/${id}`
                );

                const data = await response.json();

                setTitle(data.title || "");
                setCategory(data.category || "");
                setDescription(data.description || "");
                setContent(data.content || "");

                setCurrentImage(data.image || "");

            } catch (err) {

                setError("Failed to load post.");

            } finally {

                setLoading(false);

            }

        };

        fetchPost();

    }, [id]);

    /* =========================
       UPDATE POST
    ========================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSubmitting(true);

        try {

            const token = localStorage.getItem("token");

            const postData = new FormData();

            postData.append("title", title);
            postData.append("category", category);
            postData.append("description", description);
            postData.append("content", content);

            if(image){

                postData.append("image", image);

            }

            const response = await fetch(
                `${API}/api/posts/${id}`,
                {
                    method: "PUT",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                    body: postData,
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setError(
                    data.message || "Failed to update post."
                );

                return;

            }

            navigate(`/posts/${id}`);

        } catch (err) {

            setError(
                "Something went wrong. Please try again."
            );

        } finally {

            setSubmitting(false);

        }

    };

    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <Layout>

                <h1
                    style={{
                        textAlign: "center",
                        padding: "4rem",
                    }}
                >

                    Loading...

                </h1>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="create-page">

                <form
                    className="create-form"
                    onSubmit={handleSubmit}
                >

                    <h1>Edit Post</h1>

                    {
                        error && (

                            <p
                                style={{
                                    color: "red",
                                    marginBottom: "1rem",
                                }}
                            >

                                {error}

                            </p>

                        )
                    }

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Short Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        required
                    />

                    {
                        currentImage && (

                            <img
                                src={`${API}${currentImage}`}
                                alt="Current"
                                className="edit-preview-image"
                            />

                        )
                    }

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                    >

                        {
                            submitting
                                ? "Saving..."
                                : "Update Post"
                        }

                    </button>

                </form>

            </div>

        </Layout>

    );

}