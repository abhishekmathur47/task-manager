import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ initialTask, onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            setStatus(initialTask.status);
            setDueDate(initialTask.dueDate);
        } else {
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setDueDate('');
        }
        setErrors({});
    }, [initialTask]);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Title is mandatory.';
        }
        if (!dueDate) {
            newErrors.dueDate = 'Due date is mandatory.';
        } else {
            const selectedDate = new Date(dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today && !initialTask) {
                newErrors.dueDate = 'Due date cannot be in the past.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const taskData = {
                title,
                description,
                status,
                dueDate,
            };
            if (initialTask) {
                onSubmit({ ...initialTask, ...taskData });
            } else {
                onSubmit(taskData);
            }
        }
    };

    return (
        <form className="task-form-container" onSubmit={handleSubmit}>
            <h2>{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description">Description (Optional):</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="dueDate">Due Date:</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
            </div>
            <div className="button-group">
                <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="submit-btn">{initialTask ? 'Save Changes' : 'Add Task'}</button>
            </div>
        </form>
    );
}

export default TaskForm;