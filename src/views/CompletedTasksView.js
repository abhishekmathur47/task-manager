import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskSummary from '../components/TaskSummary';
import './CompletedTasksView.css';

function CompletedTasksView() {
    const { tasks, editTask, deleteTask } = useTasks();

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.status === 'Completed');
    }, [tasks]);

    const handleEditTask = (updatedTask) => {
        editTask(updatedTask.id, updatedTask);
    };

    const handleDeleteTask = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(taskId);
        }
    };

    return (
        <div className="completed-tasks-container">
            <h2>Completed Tasks</h2>
            <TaskSummary tasks={tasks} />
            {completedTasks.length > 0 ? (
                <TaskList
                    tasks={completedTasks}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                />
            ) : (
                <p className="no-tasks-message">No completed tasks yet!</p>
            )}
        </div>
    );
}

export default CompletedTasksView;