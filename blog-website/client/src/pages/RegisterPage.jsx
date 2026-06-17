import "../stylesheets/Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api.js";

export default function RegisterPage() {

    const navigate = useNavigate();

    // FIX: Uses AuthContext.login() so the header updates immediately
    // after registration without a page reload.
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /* =========================
       HANDLE CHANGE
    ========================= */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* =========================
       HANDLE SUBMIT
    ========================= */
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {

            // FIX: was hardcoded "http://localhost:5000".
            const response = await fetch(`${API}/api/auth/register`, {
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
            navigate("/");

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

                    <h1>Register</h1>

                    {error && <p className="auth-error">{error}</p>}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

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
                        {submitting ? "Creating account..." : "Register"}
                    </button>

                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>

                </form>
            </section>
        </Layout>
    );
}
