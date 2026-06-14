import "../stylesheets/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    //handling changes

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    //submit

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            // fail login

            if (!response.ok) {
                setError(data.message);
                return;
            }

            //save TOKEN jwt auth

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            //redirect

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
                    <h1>Login</h1>
                    {
                        error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )
                    }
                    
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

                        Login

                    </button>

                </form>

            </section>

        </Layout>

    );

}