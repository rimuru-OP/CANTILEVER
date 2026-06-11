import posts from "./PostData.js";
import PostCard from "../PostCard.jsx";

export default function LatestPosts() {

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