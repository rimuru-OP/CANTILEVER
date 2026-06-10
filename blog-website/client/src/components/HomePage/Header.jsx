import "../../stylesheets/Header.css";
import {Link} from "react-router-dom";
const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;
import SearchBar from "./SearchBar.jsx";
export default function Header(){
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logoUrl} alt="MyBlog Logo" className="logo" />
            </div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="search-bar">
                <SearchBar />
            </div>

            <div className="auth-links">
                <Link to="/login" className="login-btn">
                    Login
                </Link>

                <Link to="/register" className="register-btn">
                    Register
                </Link>
            </div>
        </header>
    )
}