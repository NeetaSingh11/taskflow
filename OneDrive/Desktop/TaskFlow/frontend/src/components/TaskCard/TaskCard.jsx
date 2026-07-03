import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit }) {
    return (
        <div className="task-card">

            <div className="task-header">

                <div>
                    <h3>📌 {task.title}</h3>

                    <p className="task-description">
                        {task.description || "No description provided"}
                    </p>
                </div>

                <span className={`status ${task.status.replace(" ", "-")}`}>
                    {task.status}
                </span>

            </div>

            <div className="task-footer">

                <span className={`priority ${task.priority}`}>
                    {task.priority} Priority
                </span>

                <div className="task-buttons">

                    <button
                        className="edit-btn"
                        onClick={() => onEdit(task)}
                    >
                        ✏ Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task._id)}
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default TaskCard;