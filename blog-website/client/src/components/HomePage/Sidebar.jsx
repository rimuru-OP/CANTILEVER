import { useEffect, useState } from "react";
import API from "../../api.js";

export default function Sidebar() {

    const [categories, setCategories] = useState([]);
    const [trending, setTrending]     = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API}/api/posts?page=1&limit=100`);
                const data = await response.json();
                const posts = data.posts || [];

                // derive unique categories
                const unique = [...new Set(posts.map((p) => p.category).filter(Boolean))];
                setCategories(unique);

                // top 4 most recent as trending
                setTrending(posts.slice(0, 4));

            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();

    }, []);

    return (
        <aside className="sidebar">

            <div className="sidebar-section">
                <h3>About</h3>
                <p>
                    Explore blogs about technology,
                    software development, design,
                    gaming, and modern digital culture.
                </p>
            </div>

            {trending.length > 0 && (
                <div className="sidebar-section">
                    <h3>Trending Posts</h3>
                    <ul className="trending-list">
                        {trending.map((post) => (
                            <li key={post._id}>{post.title}</li>
                        ))}
                    </ul>
                </div>
            )}

            {categories.length > 0 && (
                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <div className="categories">
                        {categories.map((category) => (
                            <span className="category-tag" key={category}>
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </aside>
    );
}