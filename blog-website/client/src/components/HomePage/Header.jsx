import "../../stylesheets/Header.css";
import {Link} from "react-router-dom";
const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;
import SearchBar from "./SearchBar.jsx";

export default function Header(){  
    const user = JSON.parse(localStorage.getItem("user"));
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
                            {
                                user.username
                                    .charAt(0)
                                    .toUpperCase()
                            }
                        </div>
                        <span className="header-username">
                            {user.username}
                        </span>
                        <button
                            className="logout-btn"
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                window.location.reload();
                            }}
                        >Logout</button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>
                    </div>
                )
            }
        </header>
    )
}