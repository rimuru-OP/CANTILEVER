import "../../stylesheets/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import SearchBar from "./SearchBar.jsx";
import logoUrl from "../../assets/logo.png";

export default function Header() {

    // FIX: was JSON.parse(localStorage.getItem("user")) called directly
    // on every render. Logout required window.location.reload() to
    // force the header to re-read localStorage.
    //
    // Now uses AuthContext: logout() updates the shared state and
    // the header re-renders reactively — no page reload needed.
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">

            <div className="logo-container">
                <Link to="/">
                    <img src={logoUrl} alt="MyBlog Logo" className="logo" />
                </Link>
            </div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="search-bar">
                <SearchBar />
            </div>

            {
                user ? (
                    <div className="header-user">
                        <div className="profile-circle">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="header-username">
                            {user.username}
                        </span>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login"    className="login-btn">Login</Link>
                        <Link to="/register" className="register-btn">Register</Link>
                    </div>
                )
            }

        </header>
    );
}
