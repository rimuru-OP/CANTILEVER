import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Wait for session rehydration before deciding
    if (loading) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                color: "#64748b",
                fontSize: "0.9rem"
            }}>
                Loading...
            </div>
        );
    }

    return user ? children : <Navigate to="/login" replace />;
}
