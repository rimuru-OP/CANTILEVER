import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, onDelete, onEdit, wasDragging }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: task._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isOverdue =
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "done";

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`task-card ${isDragging ? "dragging" : ""}`}
            {...attributes}
            {...listeners}
            onClick={() => {
                if (!wasDragging.current) onEdit(task);
            }}
        >
            <div className="task-card-header">
                <span className="task-title">{task.title}</span>
                <button
                    className="task-delete"
                    onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
                >
                    ×
                </button>
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
        </div>
    );
}