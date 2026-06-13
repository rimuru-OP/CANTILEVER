import "../stylesheets/PostsPage.css";
import Layout from "../components/Layout.jsx";
import PostData from "../data/PostData.js";
import PostCard from "../components/PostCard.jsx";

export default function PostsPage() {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const posts = [...PostData, ...savedPosts];
    return (
        <>
            <Layout>
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
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </div>
            </section>
            </Layout>
        </>
    );
}