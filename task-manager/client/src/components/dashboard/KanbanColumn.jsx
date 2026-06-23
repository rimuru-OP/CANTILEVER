import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ column, tasks, onDelete, onEdit }) {
    const { setNodeRef } = useDroppable({ id: column.id });

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
                <div ref={setNodeRef} style={{ minHeight: "200px" }}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}