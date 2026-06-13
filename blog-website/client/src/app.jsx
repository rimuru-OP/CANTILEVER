import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";

export default function App(){
 return (
    <BrowserRouter>
        <Routes>
            <Route 
                path="/" 
                element={<HomePage />} 
            />
            <Route 
                path="/about" 
                element={<AboutPage />}
            />
            <Route 
                path="/posts" 
                element={<PostsPage />} 
            />
            <Route 
                path="/posts/:id" 
                element={<BlogPost />} 
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />
             <Route
                path="/register"
                element={<RegisterPage />}
            />
            <Route
                path="/create"
                element={<CreateBlog />}
            />
        </Routes>
    </BrowserRouter>
 );
}
