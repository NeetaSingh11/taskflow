const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            status,
            dueDate,
            assignedTo,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            dueDate,
            assignedTo,
            createdBy: req.user.id,
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const {
            search,
            status,
            priority,
            page = 1,
            limit = 10,
        } = req.query;

        const query = {
            createdBy: req.user.id,
        };

        // Search
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by Status
        if (status) {
            query.status = status;
        }

        // Filter by Priority
        if (priority) {
            query.priority = priority;
        }

        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalTasks = await Task.countDocuments(query);

        res.status(200).json({
            totalTasks,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTasks / limit),
            tasks,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getTaskStats = async (req, res) => {
    try {
        const total = await Task.countDocuments({
            createdBy: req.user.id,
        });

        const pending = await Task.countDocuments({
            createdBy: req.user.id,
            status: "Pending",
        });

        const completed = await Task.countDocuments({
            createdBy: req.user.id,
            status: "Completed",
        });

        const inProgress = await Task.countDocuments({
            createdBy: req.user.id,
            status: "In Progress",
        });

        res.status(200).json({
            total,
            pending,
            completed,
            inProgress,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskStats,
};