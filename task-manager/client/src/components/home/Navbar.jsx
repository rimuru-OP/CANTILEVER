import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/Navbar.css";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                DoIt
            </Link>
            <div className="navbar-actions">
                {user ? (
                    <Link to="/dashboard" className="nav-btn">
                        Go to dashboard →
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Log in</Link>
                        <Link to="/register" className="nav-btn">Get started</Link>
                    </>
                )}
            </div>
        </nav>
    );
}