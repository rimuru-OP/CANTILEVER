import "../stylesheets/Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api.js";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {

            // FIX: was hardcoded "http://localhost:5000".
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            login(data.user, data.token);
            navigate("/", { replace: true });

        } catch (err) {

            setError("Something went wrong. Please try again.");

        } finally {

            setSubmitting(false);

        }

    };

    return (
        <Layout>
            <section className="auth-page">
                <form className="auth-form" onSubmit={handleSubmit}>

                    <h1>Login</h1>

                    {error && <p className="auth-error">{error}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Logging in..." : "Login"}
                    </button>

                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>

                </form>
            </section>
        </Layout>
    );
}
