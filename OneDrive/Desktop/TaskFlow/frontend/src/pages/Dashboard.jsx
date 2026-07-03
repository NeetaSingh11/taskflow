import "../styles/dashboard.css";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import DashboardCards from "../components/DashboardCards/DashboardCards";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskCard from "../components/TaskCard/TaskCard";
import SearchBar from "../components/SearchBar/SearchBar";
import Pagination from "../components/Pagination/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import api from "../services/api";



function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        completed: 0,
        inProgress: 0,
    });

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTask, setEditTask] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const LIMIT = 5;

    // Dashboard Cards
    const fetchStats = async () => {
        try {
        const res = await api.get("/tasks/stats");
        setStats(res.data);
        } catch (err) {
        console.log(err);
        }
    };

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
        setLoading(true);

        const res = await api.get("/tasks", {
            params: {
            search,
            status,
            priority,
            page: currentPage,
            limit: LIMIT,
            },
        });

        setTasks(res.data.tasks);
        setTotalPages(res.data.totalPages);
        } catch (err) {
        console.log(err);
        } finally {
        setLoading(false);
        }
    };

    // Delete Task
    const deleteTask = async (id) => {

        console.log("Delete clicked");

        const result = await Swal.fire({
            title: "Delete Task?",
            text: "You won't be able to recover this task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });


        console.log(result);

        if (!result.isConfirmed) return;

        await api.delete(`/tasks/${id}`);

        toast.success("Task Deleted Successfully");

        fetchTasks();
        fetchStats();
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [search, status, priority, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, priority]);

    return (
        <>
        <Navbar />

        <div className="dashboard">
            <h1 className="dashboard-title">
                Dashboard Overview
            </h1>

            <DashboardCards stats={stats} />

            <TaskForm
            editTask={editTask}
            clearEdit={() => setEditTask(null)}
            onTaskAdded={() => {
                fetchStats();
                fetchTasks();
            }}
            />

            <SearchBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            />

            <h2 className="task-section-title">
                My Tasks
            </h2>

            {loading ? (
            <div className="loading">

                <div className="spinner"></div>

                <p>Loading Tasks...</p>

            </div>
            ) : tasks.length === 0 ? (
            <p>No Tasks Found</p>
            ) : (
            tasks.map((task) => (
                <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onEdit={setEditTask}
                />
            ))
            )}

            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            />
        </div>
        </>
    );
}

export default Dashboard;