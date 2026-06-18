import { useEffect, useState } from "react";
import API from "../../api.js";
import PostCard from "../PostCard.jsx";
import { SkeletonCard } from "../Skeleton.jsx";

export default function LatestPosts() {

    const [posts, setPosts]   = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `${API}/api/posts?page=1&limit=4`
                );
                const data = await response.json();
                setPosts(Array.isArray(data.posts) ? data.posts : []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, []);

    if (loading) {
        return (
            <section className="latest-posts">
                <h2>Latest Posts</h2>
                <div className="posts-grid">
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="latest-posts">
            <h2>Latest Posts</h2>
            <div className="posts-grid">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}