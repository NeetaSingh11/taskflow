import "./SearchBar.css";

function SearchBar({
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
}) {
    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setPriority("");
    };

    return (
        <div className="search-container">

            <div className="search-box">
                <span className="search-icon">🔍</span>

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <button
                className="clear-btn"
                onClick={clearFilters}
            >
                Clear Filters
            </button>

        </div>
    );
}

export default SearchBar;