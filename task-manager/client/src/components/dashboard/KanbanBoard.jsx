import {
    DndContext,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";

const COLUMNS = [
    { id: "not_started", label: "Not Started", color: "#94a3b8" },
    { id: "in_progress", label: "In Progress", color: "#f59e0b" },
    { id: "done",        label: "Done",        color: "#22c55e" },
    { id: "cancelled",   label: "Cancelled",   color: "#ef4444" },
];

export default function KanbanBoard({ tasks, setTasks, onDelete, onUpdate }) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function getColumnTasks(status) {
        return tasks
            .filter((t) => t.status === status)
            .sort((a, b) => a.order - b.order);
    }

    function handleDragStart() {}

    async function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        const activeTask = tasks.find((t) => t._id === activeId);
        const overColumn = COLUMNS.find((c) => c.id === overId);
        const newStatus = overColumn
            ? overColumn.id
            : tasks.find((t) => t._id === overId)?.status;

        if (!newStatus) return;

        // Optimistic update
        setTasks((prev) => {
            const updated = prev.map((t) =>
                t._id === activeId ? { ...t, status: newStatus } : t
            );

            const columnTasks = updated
                .filter((t) => t.status === newStatus)
                .sort((a, b) => a.order - b.order);

            const oldIndex = columnTasks.findIndex((t) => t._id === activeId);
            const newIndex = columnTasks.findIndex((t) => t._id === overId);

            const reordered = newIndex >= 0
                ? arrayMove(columnTasks, oldIndex, newIndex)
                : columnTasks;

            const withOrder = reordered.map((t, i) => ({ ...t, order: i }));

            return updated.map((t) => {
                const reorderedTask = withOrder.find((r) => r._id === t._id);
                return reorderedTask || t;
            });
        });

        // Persist to server
        try {
            await onUpdate(activeId, { status: newStatus });
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    }

    const activeTask = null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="kanban-board">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        column={col}
                        tasks={getColumnTasks(col.id)}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeTask && (
                    <div className="task-card" style={{ opacity: 0.9 }}>
                        <div className="task-card-header">
                            <span className="task-title">{activeTask.title}</span>
                        </div>
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}