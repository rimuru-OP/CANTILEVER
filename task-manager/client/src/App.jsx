import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                      path="/dashboard"
                      element={
                          <ProtectedRoute>
                              <Dashboard />
                          </ProtectedRoute>
                      }
                  />
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}