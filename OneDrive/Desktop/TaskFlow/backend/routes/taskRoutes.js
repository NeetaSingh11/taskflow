const express = require("express");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskStats,
} = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Task (Protected Route)
router.get("/stats", protect, getTaskStats);
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;