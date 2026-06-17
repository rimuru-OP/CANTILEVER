// FIX: Previously "http://localhost:5000" was copy-pasted into every
// component that makes a fetch call. Changing the URL now means
// updating 5+ files. Instead, every file imports API from here.
//
// Usage:  import API from "../api.js";
//         fetch(`${API}/api/posts`)
//
// In production, set VITE_API_URL in your hosting environment.

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default API;
