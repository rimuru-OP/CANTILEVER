import "../stylesheets/PostsPage.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PostCard from "../components/PostCard.jsx";
import API from "../api.js";

export default function PostsPage() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // FIX: SearchBar navigates to /posts?search=term.
    // useSearchParams reads that value so we can filter the results.
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                // FIX: was hardcoded "http://localhost:5000".
                // Now uses the shared API constant from src/api.js.
                const response = await fetch(`${API}/api/posts`);
                const data = await response.json();
                setPosts(data);

            } catch (err) {

                console.error("Failed to fetch posts:", err);

            } finally {

                setLoading(false);

            }

        };

        fetchPosts();

    }, []);

    /* Filter client-side when a search param is present */
    const displayedPosts = searchQuery
        ? posts.filter((post) =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : posts;

    if (loading) {
        return (
            <Layout>
                <h1 style={{ textAlign: "center", padding: "4rem" }}>
                    Loading...
                </h1>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="posts-page">

                {/* HERO */}
                <div className="posts-hero">
                    <h1>
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : "Explore Blogs"}
                    </h1>
                    <p>
                        {searchQuery
                            ? `${displayedPosts.length} post${displayedPosts.length !== 1 ? "s" : ""} found`
                            : "Discover stories, ideas, and insights from creators around the world."}
                    </p>
                </div>

                {/* POSTS GRID */}
                <div className="posts-container">
                    {displayedPosts.length > 0 ? (
                        displayedPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem" }}>
                            No posts found.
                        </p>
                    )}
                </div>

            </section>
        </Layout>
    );
}
