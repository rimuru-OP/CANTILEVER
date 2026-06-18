import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import HomePage     from "./pages/HomePage.jsx";
import AboutPage    from "./pages/AboutPage.jsx";
import PostsPage    from "./pages/PostsPage.jsx";
import LoginPage    from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BlogPost     from "./pages/BlogPost.jsx";
import CreateBlog   from "./pages/CreateBlog.jsx";
import EditBlog     from "./pages/EditBlog.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export default function App() {
    return (
        // FIX: Wrap the entire app in AuthProvider so every component
        // can access the logged-in user via useAuth() without prop drilling
        // or reading localStorage directly.
        <ErrorBoundary>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/"         element={<HomePage />} />
                        <Route path="/about"    element={<AboutPage />} />
                        <Route path="/posts"    element={<PostsPage />} />
                        <Route path="/posts/:id" element={<BlogPost />} />
                        <Route path="/login"    element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* FIX: /create and /edit/:id wrapped with ProtectedRoute.
                            Previously both pages had their own useEffect auth check
                            which caused a flash of the page before redirecting.
                            ProtectedRoute redirects before the child even mounts. */}
                        <Route
                            path="/create"
                            element={
                                <ProtectedRoute>
                                    <CreateBlog />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditBlog />
                                </ProtectedRoute>
                            }
                        />

                        {/* FIX: Added catch-all 404 route.
                            Without this, any unknown URL renders a blank page. */}
                        <Route path="*" element={<NotFoundPage />} />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    );
}
