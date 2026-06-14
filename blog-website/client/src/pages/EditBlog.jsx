import "../stylesheets/CreateBlog.css";

import { useState, useEffect } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import Layout from "../components/Layout.jsx";

export default function EditBlog() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);

    /* =========================
       AUTH CHECK
    ========================= */

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login");

        }

    }, [navigate]);

    /* =========================
       FETCH POST
    ========================= */

    useEffect(() => {

        const fetchPost = async () => {

            try {

                const response = await fetch(

                    `http://localhost:5000/api/posts/${id}`

                );

                const data = await response.json();

                setTitle(data.title || "");

                setCategory(data.category || "");

                setDescription(data.description || "");

                setContent(data.content || "");

            } catch (err) {

                console.log(err);

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

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(

                `http://localhost:5000/api/posts/${id}`,

                {

                    method: "PUT",

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

                }

            );

            const data = await response.json();

            if (!response.ok) {

                console.log(data.message);

                return;

            }

            navigate(`/posts/${id}`);

        } catch (err) {

            console.log(err);

        }

    };

    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <Layout>

                <h1>Loading...</h1>

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

                    <button type="submit">

                        Update Post

                    </button>

                </form>

            </div>

        </Layout>

    );

}