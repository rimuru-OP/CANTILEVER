import { createContext, useContext, useState } from "react";

/* =========================
   CONTEXT
========================= */
const AuthContext = createContext(null);

/* =========================
   PROVIDER
========================= */
// FIX: Header was reading JSON.parse(localStorage.getItem("user"))
// directly on every render, and logout required window.location.reload()
// to force the header to update. This context gives every component
// reactive access to the logged-in user. Login/logout update state,
// the header re-renders automatically — no page reload needed.
export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch {
            return null;
        }
    });

    /* LOGIN — call this after a successful API login or register */
    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    /* LOGOUT — clears storage and state */
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

/* =========================
   HOOK
========================= */
// Usage:  const { user, login, logout } = useAuth();
export function useAuth() {
    return useContext(AuthContext);
}
