import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
            const res = await api.post("/auth/register", formData);

            toast.success(res.data.message);

            navigate("/");
        } 
        catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
    <div className="login-container">
        <div className="login-card">
        <h1>TaskFlow</h1>
        <p>Create your account</p>

        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <label>Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
            />
            </div>

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
            Register
            </button>
        </form>

        <p className="register-link">
            Already have an account?
            <Link to="/"> Login</Link>
        </p>
        </div>
    </div>
    );
}

export default Register;