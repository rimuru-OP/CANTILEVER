import "../stylesheets/PostsPage.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import PostCard from "../components/PostCard.jsx";
import API from "../api.js";

export default function PostsPage() {

    const [posts, setPosts]           = useState([]);
    const [loading, setLoading]       = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page:  currentPage,
                    limit: 10,
                    ...(searchQuery && { search: searchQuery }),
                });

                const response = await fetch(`${API}/api/posts?${params}`);
                const data = await response.json();
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, [currentPage, searchQuery]);

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

                <div className="posts-hero">
                    <h1>
                        {searchQuery ? `Results for "${searchQuery}"` : "Explore Blogs"}
                    </h1>
                    <p>
                        {searchQuery
                            ? `${posts.length} post${posts.length !== 1 ? "s" : ""} found`
                            : "Discover stories, ideas, and insights from creators around the world."}
                    </p>
                </div>

                <div className="posts-container">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem" }}>
                            No posts found.
                        </p>
                    )}
                </div>

                {!searchQuery && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "2rem" }}>
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>
                        <span style={{ alignSelf: "center" }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                    </div>
                )}

            </section>
        </Layout>
    );
}