import "../stylesheets/BlogPost.css";

import { useParams } from "react-router-dom";
import Header from "../components/HomePage/Header.jsx";
import Footer from "../components/HomePage/Footer.jsx";
import posts from "../data/PostData.js";

export default function BlogPost() {

    const { id } = useParams();

    const post = posts.find(
        (post) => post.id === Number(id)
    );

    if (!post) {

        return (

            <>
                <Header />

                <section className="blog-not-found">

                    <h1>Post Not Found</h1>

                    <p>
                        The blog post you are looking for does not exist.
                    </p>

                </section>

                <Footer />
            </>

        );
    }

    return (

        <>

            <Header />

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

            <Footer />

        </>

    );

}