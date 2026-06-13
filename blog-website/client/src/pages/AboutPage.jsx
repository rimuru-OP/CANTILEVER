import "../stylesheets/AboutPage.css";
import Layout from "../components/Layout.jsx";
export default function AboutPage() {

    return (
        <>
            <Layout >
            <section className="about-page">
                {/* HERO */}
                <div className="about-hero">
                    <h1>
                        A Place Where Ideas Become Stories
                    </h1>
                    <p>
                        MyBlog is a modern blogging platform designed for
                        creators, developers, writers, gamers, and curious minds
                        who want to share meaningful content with the world.
                    </p>
                </div>
                {/* MAIN CONTENT */}
                <div className="about-content">
                    <div className="about-card">
                        <h2>Our Vision</h2>
                        <p>
                            We wanted to build more than just another blogging
                            website. MyBlog is focused on creating a clean,
                            fast, and immersive reading experience where content
                            feels personal and engaging.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2>Why MyBlog?</h2>
                        <p>
                            Modern platforms are often cluttered with ads,
                            distractions, and unnecessary complexity.
                            MyBlog keeps the focus where it belongs:
                            the stories, ideas, and creativity of its users.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2>What You Can Explore</h2>

                        <div className="features-grid">
                            <div className="feature-box">
                                <span>💻</span>
                                <h3>Technology</h3>
                            </div>

                            <div className="feature-box">
                                <span>🎮</span>
                                <h3>Gaming</h3>
                            </div>

                            <div className="feature-box">
                                <span>🎨</span>
                                <h3>Design</h3>
                            </div>

                            <div className="feature-box">
                                <span>🤖</span>
                                <h3>Artificial Intelligence</h3>
                            </div>

                            <div className="feature-box">
                                <span>🚀</span>
                                <h3>Startups</h3>
                            </div>

                            <div className="feature-box">
                                <span>📚</span>
                                <h3>Stories & Ideas</h3>
                            </div>
                        </div>
                    </div>

                    <div className="about-card">
                        <h2>Built For Modern Creators</h2>
                        <p>
                            Built using React and modern web technologies,
                            MyBlog aims to provide a smooth and responsive
                            experience across all devices.
                        </p>
                    </div>
                </div>
            </section>
            </Layout>
        </>
    );
}