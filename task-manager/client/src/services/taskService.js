const API = import.meta.env.VITE_API_URL;

const headers = { "Content-Type": "application/json" };
const credentials = "include";

export async function fetchTasks() {
    const res = await fetch(`${API}/api/tasks`, { credentials });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.tasks;
}

export async function createTask(payload) {
    const res = await fetch(`${API}/api/tasks`, {
        method: "POST",
        headers,
        credentials,
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.task;
}

export async function updateTask(id, payload) {
    const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "PATCH",
        headers,
        credentials,
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.task;
}

export async function deleteTask(id) {
    const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
        credentials,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}