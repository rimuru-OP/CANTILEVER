import "../stylesheets/BlogPost.css";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";


export default function BlogPost() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPost = async ()=>{
            try{
                const response = await fetch(
                    `http://localhost:5000/api/posts/${id}`
                );
                const data = await response.json();   
                setPost(data);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            };
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <h1>Loading...</h1>
            </Layout>
        );
    }
    if (!post || post.message) {

        return (
            <Layout>

                <section className="blog-not-found">
                    <h1>Post Not Found</h1>
                    <p>
                        The blog post you are looking for does not exist.
                    </p>
                </section>

            </Layout>
        );
    }

    return (


        <Layout>

            <section className="blog-post-page">

                {/* HERO */}

                <div className="blog-hero">

                    <img
                        src={post.image}
                        alt={post.title}
                        className="blog-image"
                    />

                </div>

                {/* BLOG CONTENT */}

                <div className="blog-content">

                    <span className="blog-category">
                        {post.category}
                    </span>

                    <h1>{post.title}</h1>

                    <div className="blog-meta">

                        <span>{post.author}</span>

                        <span>{post.date}</span>

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