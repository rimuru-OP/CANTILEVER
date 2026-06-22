import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                DoIt
            </Link>
            <div className="navbar-actions">
                <Link to="/login" className="nav-link">Log in</Link>
                <Link to="/register" className="nav-btn">Get started</Link>
            </div>
        </nav>
    );
}
