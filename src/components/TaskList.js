import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css'; // Import TaskList specific CSS

function TaskList({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return <p className="no-tasks-message">No tasks to display based on current filters/sorting.</p>;
    }
    return (
        <div className="task-list-container">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;