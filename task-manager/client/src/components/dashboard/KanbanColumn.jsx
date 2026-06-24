import TaskCard from "./TaskCard";

export default function KanbanColumn({ column, tasks, onDelete, onEdit, onMove, isFirst, isLast }) {
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
            <div style={{ minHeight: "200px" }}>
                {tasks.length === 0 ? (
                    <div className="column-empty">
                        <span>No tasks here</span>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onMove={onMove}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    ))
                )}
            </div>
        </div>
    );
}