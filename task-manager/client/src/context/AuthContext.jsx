import { createContext, useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while rehydrating from cookie

    // On mount, check if there's a valid cookie/session
    useEffect(() => {
        fetch(`${API}/api/auth/me`, { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => setUser(data?.user ?? null))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    async function register(name, email, password) {
        const res = await fetch(`${API}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUser(data.user);
    }

    async function login(email, password) {
        const res = await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUser(data.user);
    }

    async function logout() {
        await fetch(`${API}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
