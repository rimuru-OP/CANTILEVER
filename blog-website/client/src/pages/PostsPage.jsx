import "../stylesheets/PostsPage.css";
import { useState, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import PostCard from "../components/PostCard.jsx";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchPosts = async () => {
            try {
                const response = await  fetch(
                    "http://localhost:5000/api/posts"
                );
                const data = await response.json();
                setPosts(data);
            }
            catch(err){
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    if(loading){
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Layout>
            <section className="posts-page">
                {/* HERO */}
                <div className="posts-hero">
                    <h1>Explore Blogs</h1>
                    <p>
                        Discover stories, ideas, and insights from creators
                        around the world.
                    </p>
                </div>
                {/* POSTS GRID */}
                <div className="posts-container">
                    {
                        posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))
                    }
                </div>
            </section>
            </Layout>
        </>
    );
}