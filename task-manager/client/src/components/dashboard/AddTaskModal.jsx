import { useState } from "react";

const COLUMNS = [
    { id: "not_started", label: "Not Started" },
    { id: "in_progress", label: "In Progress" },
    { id: "done",        label: "Done" },
    { id: "cancelled",   label: "Cancelled" },
];

export default function AddTaskModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "not_started",
        dueDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await onAdd({ ...form, dueDate: form.dueDate || null });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>New task</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        name="title"
                        placeholder="Task title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <div className="modal-row">
                        <select name="priority" value={form.priority} onChange={handleChange}>
                            <option value="low">Low priority</option>
                            <option value="medium">Medium priority</option>
                            <option value="high">High priority</option>
                        </select>
                        <select name="status" value={form.status} onChange={handleChange}>
                            {COLUMNS.map((c) => (
                                <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                    />
                    {error && <div className="auth-error">{error}</div>}
                    <div className="modal-actions">
                        <button type="button" className="modal-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-submit" disabled={loading}>
                            {loading ? "Adding..." : "Add task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}