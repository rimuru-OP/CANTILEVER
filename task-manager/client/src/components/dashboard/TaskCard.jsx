export default function TaskCard({ task, onDelete, onEdit, onMove, isFirst, isLast }) {
    const isOverdue =
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done";

    const isCancelled = task.status === "cancelled";

    return (
        <div className={`task-card ${isCancelled ? "task-cancelled" : ""}`}>
            <div className="task-card-header">
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                    {!isCancelled && (
                        <button
                            className="task-edit"
                            onClick={() => onEdit(task)}
                            title="Edit task"
                        >
                            ✎
                        </button>
                    )}
                    <button
                        className="task-delete"
                        onClick={() => onDelete(task._id)}
                        title="Delete task"
                    >
                        ×
                    </button>
                </div>
            </div>
            {task.description && (
                <p className="task-description">{task.description}</p>
            )}
            <div className="task-footer">
                <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                </span>
                {task.dueDate && (
                    <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
                        {isOverdue ? "⚠ " : ""}
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                )}
            </div>
            <div className="task-move">
                <button
                    className="move-btn"
                    onClick={() => onMove(task, "left")}
                    disabled={isFirst}
                    title="Move left"
                >
                    ←
                </button>
                <button
                    className="move-btn"
                    onClick={() => onMove(task, "right")}
                    disabled={isLast}
                    title="Move right"
                >
                    →
                </button>
            </div>
        </div>
    );
}