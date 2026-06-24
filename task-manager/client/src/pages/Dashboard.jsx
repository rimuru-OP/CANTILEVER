import { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import KanbanBoard from "../components/dashboard/KanbanBoard.jsx";
import AddTaskModal from "../components/dashboard/AddTaskModal.jsx";
import ReviewPanel from "../components/dashboard/ReviewPanel.jsx";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskService.js";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [search, setSearch] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [activeTab, setActiveTab] = useState("tasks");

    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch(console.error)
            .finally(() => setLoadingTasks(false));
    }, []);

    async function handleAddTask(payload) {
        const task = await createTask(payload);
        setTasks((prev) => [...prev, task]);
    }

    async function handleDelete(id) {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
    }

    async function handleUpdate(id, payload) {
        const updated = await updateTask(id, payload);
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    }

    function handleEditClick(task) {
        setEditingTask(task);
    }

    function handleModalClose() {
        setShowModal(false);
        setEditingTask(null);
    }

    const filteredTasks = tasks
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .filter((t) => filterPriority === "all" ? true : t.priority === filterPriority);

    const totalTasks = tasks.length;
    const doneTasks = tasks.filter((t) => t.status === "done").length;
    const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
    const overdueTasks = tasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length;

    return (
        <div className="dashboard">
            <DashboardHeader />

            <div className="dashboard-body">
                <div className="board-header">
                    <div>
                        <h1>My Board</h1>
                        {!loadingTasks && totalTasks > 0 && (
                            <div className="board-summary">
                                <span>{doneTasks}/{totalTasks} done</span>
                                <span className="summary-dot">·</span>
                                <span>{inProgressTasks} in progress</span>
                                {overdueTasks > 0 && (
                                    <>
                                        <span className="summary-dot">·</span>
                                        <span className="summary-overdue">⚠ {overdueTasks} overdue</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="board-header-right">
                        <div className="dashboard-tabs">
                            <button
                                className={`dash-tab ${activeTab === "tasks" ? "active" : ""}`}
                                onClick={() => setActiveTab("tasks")}
                            >
                                Tasks
                            </button>
                            <button
                                className={`dash-tab ${activeTab === "review" ? "active" : ""}`}
                                onClick={() => setActiveTab("review")}
                            >
                                Review
                            </button>
                        </div>
                        {activeTab === "tasks" && (
                            <button className="add-task-btn" onClick={() => setShowModal(true)}>
                                + New task
                            </button>
                        )}
                    </div>
                </div>

                {activeTab === "tasks" && (
                    <>
                        <div className="board-filters">
                            <input
                                className="filter-search"
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="filter-select"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <option value="all">All priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {(search || filterPriority !== "all") && (
                                <button
                                    className="filter-clear"
                                    onClick={() => { setSearch(""); setFilterPriority("all"); }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {loadingTasks ? (
                            <div className="board-skeleton">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="skeleton-column">
                                        <div className="skeleton-header" />
                                        <div className="skeleton-card" />
                                        <div className="skeleton-card short" />
                                        <div className="skeleton-card" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <KanbanBoard
                                tasks={filteredTasks}
                                setTasks={setTasks}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                onEdit={handleEditClick}
                            />
                        )}
                    </>
                )}

                {activeTab === "review" && (
                    <ReviewPanel tasks={tasks} />
                )}
            </div>

            {(showModal || editingTask) && (
                <AddTaskModal
                    onClose={handleModalClose}
                    onAdd={handleAddTask}
                    onEdit={handleUpdate}
                    task={editingTask}
                />
            )}
        </div>
    );
}