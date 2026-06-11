import { Link } from "react-router-dom";

export default function PostCard({ post }) {

    return (

        <Link
            to={`/posts/${post.id}`}
            className="post-link"
        >

            <div className="post-card">

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

        </Link>

    );
}