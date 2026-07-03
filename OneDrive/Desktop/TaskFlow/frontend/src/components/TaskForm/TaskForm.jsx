import "./TaskForm.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function TaskForm({ onTaskAdded, editTask, clearEdit }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
    });

    // Fill form when Edit is clicked
    useEffect(() => {
        if (editTask) {
        setFormData({
            title: editTask.title,
            description: editTask.description || "",
            priority: editTask.priority,
            status: editTask.status,
        });
        }
    }, [editTask]);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (editTask) {
            await api.put(`/tasks/${editTask._id}`, formData);

            toast.success("Task Updated Successfully");

            clearEdit();
        } else {
            await api.post("/tasks", formData);

            toast.success("Task Created Successfully");
        }

        resetForm();

        if (onTaskAdded) {
            onTaskAdded();
        }

        } catch (err) {
        toast.error(err.response?.data?.message || "Operation Failed");
        }
    };

    return (
    <div className="task-form">

        <h2>
            {editTask ? "✏ Edit Task" : "➕ Add New Task"}
        </h2>

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
            />

            <div className="form-row">

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>

                <button type="submit">
                    {editTask ? "Update Task" : "Add Task"}
                </button>

            </div>

            {editTask && (
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                        clearEdit();
                        resetForm();
                    }}
                >
                    Cancel
                </button>
            )}
        </form>
    </div>
    );
}

export default TaskForm;