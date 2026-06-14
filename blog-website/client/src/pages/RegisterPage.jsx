import "../stylesheets/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

    });

    const [error, setError] = useState("");

    /* =========================
       HANDLE CHANGE
    ========================= */

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    /* =========================
       HANDLE SUBMIT
    ========================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await fetch(

                "http://localhost:5000/api/auth/register",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify(formData),

                }

            );

            const data = await response.json();

            /* REGISTER FAILED */

            if (!response.ok) {

                setError(data.message);

                return;

            }

            /* SAVE TOKEN */

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            /* REDIRECT */

            navigate("/");

        } catch (err) {

            setError("Something went wrong");

        }

    };

    return (

        <Layout>

            <section className="auth-page">

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <h1>Register</h1>

                    {
                        error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )
                    }

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

                    <button type="submit">

                        Register

                    </button>

                </form>

            </section>

        </Layout>

    );

}