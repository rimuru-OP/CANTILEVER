import { useEffect, useState } from "react";

import PostCard from "../PostCard.jsx";

export default function LatestPosts() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    //fetch
    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/posts"
                );

                const data = await response.json();

                setPosts(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchPosts();

    }, []);

    //loading
    if (loading) {

        return <h1>Loading...</h1>;

    }

    return (

        <section className="latest-posts">

            <h2>Latest Posts</h2>

            <div className="posts-grid">

                {
                    posts.slice(0, 4).map((post) => (

                        <PostCard
                            key={post._id}
                            post={post}
                        />

                    ))
                }

            </div>

        </section>

    );

}