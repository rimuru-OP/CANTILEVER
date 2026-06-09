import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Post from "./pages/Post.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

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
                path="/post" 
                element={<Post />} 
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />
             <Route
                path="/register"
                element={<RegisterPage />}
            />

        </Routes>
    </BrowserRouter>
 );
}
