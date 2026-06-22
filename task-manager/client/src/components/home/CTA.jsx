import { Link } from "react-router-dom";
import "../../styles/CTA.css";

export default function CTA() {
    return (
        <section className="cta">
            <div className="cta-inner">
                <h2>
                    Ready to actually<br />
                    <span>get things done?</span>
                </h2>
                <p>
                    Join thousands of people who use DoIt to stay organized and on top of their work.
                </p>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-btn-primary">
                        Create free account →
                    </Link>
                    <Link to="/login" className="cta-btn-secondary">
                        Log in
                    </Link>
                </div>
            </div>
        </section>
    );
}
