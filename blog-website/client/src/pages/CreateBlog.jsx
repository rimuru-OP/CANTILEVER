import "../stylesheets/CreateBlog.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function CreateBlog() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(),
            title,
            content,
            category,
        };

        const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

        existingPosts.push(newPost);

        localStorage.setItem(
            "posts",
            JSON.stringify(existingPosts)
        );

        navigate("/posts");
   };

    return (
        <>
            <Layout>
            <div className="create-page">
                <form
                    className="create-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <button type="submit">
                        Create Post
                    </button>
                </form>
            </div>
            </Layout>
        </>
   );
}