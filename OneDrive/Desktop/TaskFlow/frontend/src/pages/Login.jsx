import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await api.post("/auth/login", formData);

        localStorage.setItem("token", res.data.token);

        toast.success("Login Successful");

        setTimeout(() => {
            navigate("/dashboard", { replace: true });
            }, 500);
        } 
        catch (err) {
        toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="login-container">
        <div className="login-card">
            <h1>TaskFlow</h1>
            <p>Sign in to continue</p>

            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Email</label>
                <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                />
            </div>

            <button type="submit">
                Login
            </button>
            </form>

            <p className="register-link">
            Don't have an account?
            <Link to="/register"> Register</Link>
            </p>
        </div>
        </div>
    );
}

export default Login;