import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onEdit, onDelete }) {
    const statusClass = task.status.toLowerCase().replace(' ', '-');

    return (
        <div className={`task-card ${statusClass}`}>
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-actions">
                    <button className="edit-btn" onClick={() => onEdit(task)}> &#x270F; </button>
                    <button className="delete-btn" onClick={() => onDelete(task.id)}> &#x1F5D1; </button>
                </div>
            </div>
            <p className="task-description">{task.description || 'No description provided.'}</p>
            <div className="task-details">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>

        </div>
    );
}

export default TaskCard;