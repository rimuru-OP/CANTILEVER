import { Link } from "react-router-dom";

export default function PostCard({ post }) {

    // FIX: was post.date which is undefined for API posts —
    // MongoDB returns createdAt (a timestamp), not a "date" field.
    const formattedDate = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day:   "numeric",
              year:  "numeric",
          })
        : "";

    return (
        <Link to={`/posts/${post._id}`} className="post-link">

            <div className="post-card">

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="post-image"
                    />
                )}

                <div className="post-content">

                    <h3>{post.title}</h3>

                    <p>{post.description}</p>

                    <div className="post-meta">
                        <span>{post.author}</span>
                        <span>{formattedDate}</span>
                    </div>

                </div>

            </div>

        </Link>
    );
}
