import PostData from "../../data/PostData";
import PostCard from "../PostCard.jsx";

export default function LatestPosts() {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const posts = [...PostData, ...savedPosts];

    return (
        <section className="latest-posts">
            <h2>Latest Posts</h2>
            <div className="posts-grid">
                {
                    posts.map((post) => {
                        return (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        );
                    })
                }
            </div>
        </section>
    );
}