import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="logo">
                📋 <span>TaskFlow</span>
            </div>

            <div className="nav-center">
                <h3>Dashboard</h3>
            </div>

            <div className="nav-right">
                <div className="welcome">
                    <p>Welcome</p>
                    <span>👋</span>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

        </nav>
    );
}

export default Navbar;