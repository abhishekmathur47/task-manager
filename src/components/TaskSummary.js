import React from 'react';
import './TaskSummary.css'; // Import TaskSummary specific CSS

function TaskSummary({ tasks }) {
    const pendingCount = tasks.filter(task => task.status === 'Pending').length;
    const inProgressCount = tasks.filter(task => task.status === 'In Progress').length;
    const completedCount = tasks.filter(task => task.status === 'Completed').length;
    const totalCount = tasks.length;

    return (
        <div className="summary-container">
            <div className="summary-card total">
                <h3>Total Tasks</h3>
                <p>{totalCount}</p>
            </div>
            <div className="summary-card pending">
                <h3>Pending</h3>
                <p>{pendingCount}</p>
            </div>
            <div className="summary-card in-progress">
                <h3>In Progress</h3>
                <p>{inProgressCount}</p>
            </div>
            <div className="summary-card completed">
                <h3>Completed</h3>
                <p>{completedCount}</p>
            </div>
        </div>
    );
}

export default TaskSummary;