import "../stylesheets/PostsPage.css";
import Header from "../components/HomePage/Header.jsx";
import Footer from "../components/HomePage/Footer.jsx";
import posts from "../components/HomePage/PostData.js";

export default function PostsPage() {
    return (
        <>
            <Header />
            <section className="posts-page">

                {/* HERO */}

                <div className="posts-hero">

                    <h1>Explore Blogs</h1>

                    <p>
                        Discover stories, ideas, and insights from creators
                        around the world.
                    </p>

                </div>

                {/* POSTS GRID */}

                <div className="posts-container">

                    {
                        posts.map((post) => {

                            return (

                                <div
                                    className="post-card"
                                    key={post.id}
                                >

                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="post-image"
                                    />

                                    <div className="post-content">

                                        <h2>{post.title}</h2>

                                        <p>{post.description}</p>

                                        <div className="post-meta">

                                            <span>{post.author}</span>

                                            <span>{post.date}</span>

                                        </div>

                                    </div>

                                </div>

                            );
                        })
                    }

                </div>

            </section>

            <Footer />
        </>
    );
}