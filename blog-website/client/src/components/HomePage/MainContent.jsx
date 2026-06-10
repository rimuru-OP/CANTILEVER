import "../../stylesheets/MainContent.css";
import LatestPosts from "./LatestPosts.jsx";
import Sidebar from "./Sidebar.jsx";

export default function MainContent() {
    return (
        <main className="divider">

            <LatestPosts />

            <Sidebar />

        </main>
    );
}