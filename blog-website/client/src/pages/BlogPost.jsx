import "../stylesheets/BlogPost.css";

import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";

import Layout from "../components/Layout.jsx";

export default function BlogPost() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const [loading, setLoading] = useState(true);

    const loggedInUser = JSON.parse(
        localStorage.getItem("user")
    );

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

                setPost(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchPost();

    }, [id]);

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

    /* =========================
       NOT FOUND
    ========================= */

    if (!post || post.message) {

        return (

            <Layout>

                <section className="blog-not-found">

                    <h1>Post Not Found</h1>

                    <p>

                        The blog post you are looking
                        for does not exist.

                    </p>

                </section>

            </Layout>

        );

    }

    /* =========================
       OWNERSHIP CHECK
    ========================= */

    const isOwner =

        loggedInUser &&

        loggedInUser.id === post.user;

    /* =========================
       DELETE POST
    ========================= */

    const handleDelete = async () => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this post?"

        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(

                `http://localhost:5000/api/posts/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            const data = await response.json();

            if (!response.ok) {

                console.log(data.message);

                return;

            }

            navigate("/posts");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <Layout>

            <section className="blog-post-page">

                {/* HERO IMAGE */}

                {
                    post.image && (

                        <div className="blog-hero">

                            <img
                                src={post.image}
                                alt={post.title}
                                className="blog-image"
                            />

                        </div>

                    )
                }

                {/* BLOG CONTENT */}

                <div className="blog-content">

                    <span className="blog-category">

                        {post.category}

                    </span>

                    <h1>{post.title}</h1>

                    {/* HEADER ROW */}

                    <div className="blog-header-row">

                        <div className="blog-meta">

                            <span>

                                {post.author}

                            </span>

                            <span>

                                {
                                    new Date(post.createdAt)
                                        .toLocaleDateString()
                                }

                            </span>

                        </div>

                        {
                            isOwner && (

                                <div className="post-actions">

                                    <Link
                                        to={`/edit/${post._id}`}
                                        className="edit-btn"
                                    >

                                        Edit

                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={handleDelete}
                                    >

                                        Delete

                                    </button>

                                </div>

                            )
                        }

                    </div>

                    <p className="blog-description">

                        {post.description}

                    </p>

                    <div className="blog-text">

                        {
                            post.content
                                .split("\n")
                                .filter(

                                    (paragraph) =>

                                        paragraph.trim() !== ""

                                )
                                .map((paragraph, index) => (

                                    <p key={index}>

                                        {paragraph}

                                    </p>

                                ))
                        }

                    </div>

                </div>

            </section>

        </Layout>

    );

}