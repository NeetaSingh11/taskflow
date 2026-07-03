import "./DashboardCards.css";

function DashboardCards({ stats }) {
    return (
        <div className="cards">

            <div className="card total-card">
                <div className="card-top">
                    <span className="card-icon">📋</span>
                    <h3>Total Tasks</h3>
                </div>

                <h2>{stats.total}</h2>
            </div>

            <div className="card pending-card">
                <div className="card-top">
                    <span className="card-icon">⏳</span>
                    <h3>Pending</h3>
                </div>

                <h2>{stats.pending}</h2>
            </div>

            <div className="card completed-card">
                <div className="card-top">
                    <span className="card-icon">✅</span>
                    <h3>Completed</h3>
                </div>

                <h2>{stats.completed}</h2>
            </div>

            <div className="card progress-card">
                <div className="card-top">
                    <span className="card-icon">🚀</span>
                    <h3>In Progress</h3>
                </div>

                <h2>{stats.inProgress}</h2>
            </div>

        </div>
    );
}

export default DashboardCards;