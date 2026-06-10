import { Link } from "react-router-dom";
import "../../stylesheets/Hero.css";
export default function Hero() {
    return (
        <section className="hero-section">

            <div className="hero-content">

                <h1>
                    Share Your Ideas With The World
                </h1>

                <p>
                    Write blogs, explore stories, and connect with people
                    through meaningful content.
                </p>

                <div className="hero-buttons">

                    <Link to="/create" className="hero-primary-btn">
                        Start Writing
                    </Link>

                    <Link to="/posts" className="hero-secondary-btn">
                        Explore Blogs
                    </Link>

                </div>

            </div>

        </section>
    );
}