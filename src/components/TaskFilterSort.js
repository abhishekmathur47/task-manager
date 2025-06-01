import React from 'react';
import './TaskFilterSort.css'; // Import TaskFilterSort specific CSS

function TaskFilterSort({ onFilterChange, onSortChange, currentFilter, currentSort }) {
    return (
        <div className="filter-sort-container">
            <div className="select-wrapper">
                <label htmlFor="status-filter">Filter by Status:</label>
                <select
                    id="status-filter"
                    value={currentFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="select-wrapper">
                <label htmlFor="sort-order">Sort by Due Date:</label>
                <select
                    id="sort-order"
                    value={currentSort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="asc">Earliest First</option>
                    <option value="desc">Latest First</option>
                </select>
            </div>
        </div>
    );
}

export default TaskFilterSort;