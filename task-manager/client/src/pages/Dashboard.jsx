import { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import KanbanBoard from "../components/dashboard/KanbanBoard.jsx";
import AddTaskModal from "../components/dashboard/AddTaskModal.jsx";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskService.js";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch(console.error);
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

    return (
        <div className="dashboard">
            <DashboardHeader />

            <div className="dashboard-body">
                <div className="board-header">
                    <h1>My Board</h1>
                    <button className="add-task-btn" onClick={() => setShowModal(true)}>
                        + New task
                    </button>
                </div>

                <KanbanBoard
                    tasks={tasks}
                    setTasks={setTasks}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onEdit={handleEditClick}
                />
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