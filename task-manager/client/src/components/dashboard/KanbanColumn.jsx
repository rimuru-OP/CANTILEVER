import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ column, tasks, onDelete, onEdit, isDraggingAny }) {
    const { setNodeRef, isOver } = useDroppable({ id: column.id });

    return (
        <div className="kanban-column">
            <div className="column-header">
                <div className="column-title">
                    <span
                        className="column-dot"
                        style={{ background: column.color }}
                    />
                    {column.label}
                </div>
                <span className="column-count">{tasks.length}</span>
            </div>
            <SortableContext
                items={tasks.map((t) => t._id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    ref={setNodeRef}
                    style={{
                        minHeight: "200px",
                        background: isOver ? "rgba(37,99,235,0.04)" : "transparent",
                        borderRadius: "8px",
                        transition: "background 0.2s",
                    }}
                >
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            isDraggingAny={isDraggingAny}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}