export default function Sidebar() {
    const categories = [
        "Technology",
        "Programming",
        "AI",
        "Design",
        "Gaming",
        "Startups"
    ];
    const trendingPosts = [
        "Why React Still Dominates Frontend",
        "How AI Is Changing Software Development",
        "The Secrets Behind Clean UI Design",
        "Learning Backend Development Properly"
    ];
    return (
        <aside className="sidebar">
            {/* ABOUT */}
            <div className="sidebar-section">
                <h3>About</h3>
                <p>
                    Explore blogs about technology,
                    software development, design,
                    gaming, and modern digital culture.
                </p>
            </div>
            {/* TRENDING */}
            <div className="sidebar-section">
                <h3>Trending Posts</h3>
                <ul className="trending-list">
                    {
                        trendingPosts.map((post, index) => (
                            <li key={index}>
                                {post}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* CATEGORIES */}
            <div className="sidebar-section">
                <h3>Categories</h3>
                <div className="categories">
                    {
                        categories.map((category, index) => (
                            <span
                                className="category-tag"
                                key={index}
                            >
                                {category}
                            </span>
                        ))
                    }
                </div>
            </div>
        </aside>
    );
}