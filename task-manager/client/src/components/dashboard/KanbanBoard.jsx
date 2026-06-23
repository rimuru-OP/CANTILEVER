import KanbanColumn from "./KanbanColumn";

const COLUMNS = [
    { id: "not_started", label: "Not Started", color: "#94a3b8" },
    { id: "in_progress", label: "In Progress", color: "#f59e0b" },
    { id: "done",        label: "Done",        color: "#22c55e" },
    { id: "cancelled",   label: "Cancelled",   color: "#ef4444" },
];

export default function KanbanBoard({ tasks, setTasks, onDelete, onUpdate, onEdit }) {
    function getColumnTasks(status) {
        return tasks
            .filter((t) => t.status === status)
            .sort((a, b) => a.order - b.order);
    }

    async function handleMove(task, direction) {
        const currentIndex = COLUMNS.findIndex((c) => c.id === task.status);
        const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= COLUMNS.length) return;

        const newStatus = COLUMNS[newIndex].id;

        // Optimistic update
        setTasks((prev) =>
            prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
        );

        try {
            await onUpdate(task._id, { status: newStatus });
        } catch (err) {
            console.error("Failed to move task:", err);
            // Revert on failure
            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? { ...t, status: task.status } : t))
            );
        }
    }

    return (
        <div className="kanban-board">
            {COLUMNS.map((col, colIndex) => (
                <KanbanColumn
                    key={col.id}
                    column={col}
                    tasks={getColumnTasks(col.id)}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onMove={handleMove}
                    isFirst={colIndex === 0}
                    isLast={colIndex === COLUMNS.length - 1}
                />
            ))}
        </div>
    );
}