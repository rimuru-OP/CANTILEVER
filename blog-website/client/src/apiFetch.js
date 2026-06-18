import API from "./api.js"

export async function apiFetch(path, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    return response;
}