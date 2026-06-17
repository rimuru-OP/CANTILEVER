import { Navigate } from "react-router-dom";

// FIX: CreateBlog and EditBlog each had their own copy of this logic:
//
//   useEffect(() => {
//       const token = localStorage.getItem("token");
//       if (!token) navigate("/login");
//   }, [navigate]);
//
// Problems with that approach:
//   1. The protected page renders for a brief flash before the redirect fires.
//   2. The check is duplicated in every protected route.
//   3. It only checks for a token string, not whether it's valid.
//
// This component wraps protected routes in App.jsx instead.
// The redirect happens before the child page mounts — no flash.

export default function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;

}
