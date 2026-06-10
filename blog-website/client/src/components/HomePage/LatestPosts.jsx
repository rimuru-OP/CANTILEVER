import posts from "./PostData.js";

export default function LatestPosts() {
    return (<section className="latest-posts">
        <h2>Latest Posts</h2>
        <div className="posts-grid">
            {
                posts.map((post) => {
                    return (
                        <div className="post-card" key={post.id}>
                            <img
                                src={post.image}
                                alt={post.title}
                                className="post-image"
                            />
                            <div className="post-content">
                                <h3>{post.title}</h3>
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
    </section>);
}