import "../stylesheets/PostsPage.css";
import Header from "../components/HomePage/Header.jsx";
import Footer from "../components/HomePage/Footer.jsx";
import posts from "../components/HomePage/PostData.js";
import PostCard from "../components/PostCard.jsx";

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
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}