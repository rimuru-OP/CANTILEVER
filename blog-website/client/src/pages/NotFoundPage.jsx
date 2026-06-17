import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function NotFoundPage() {
    return (
        <Layout>
            <section style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                gap: "1rem",
                textAlign: "center",
                padding: "2rem",
            }}>
                <h1 style={{ fontSize: "5rem", margin: 0 }}>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" style={{ marginTop: "1rem" }}>
                    ← Back to Home
                </Link>
            </section>
        </Layout>
    );
}
