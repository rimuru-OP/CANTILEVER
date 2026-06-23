import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    return (
        <header className="dashboard-header">
            <span className="dashboard-logo">DoIt</span>
            <div className="dashboard-user">
                <span>Hey, {user?.name} 👋</span>
                <button className="logout-btn" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
}