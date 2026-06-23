const Task = require("../models/Task");

// GET /api/tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ order: 1 });
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        // Place new task at the end of its column
        const lastTask = await Task.findOne({
            user: req.user._id,
            status: status || "not_started",
        }).sort({ order: -1 });

        const order = lastTask ? lastTask.order + 1 : 0;

        const task = await Task.create({
            title,
            description,
            status: status || "not_started",
            priority: priority || "medium",
            dueDate: dueDate || null,
            order,
            user: req.user._id,
        });

        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// PATCH /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const allowed = ["title", "description", "status", "priority", "dueDate", "order"];
        allowed.forEach((field) => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        await task.save();
        res.json({ task });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};