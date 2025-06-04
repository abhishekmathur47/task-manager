import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskSummary from '../components/TaskSummary';
import TaskFilterSort from '../components/TaskFilterSort';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskSearch from '../components/TaskSearch';
import Modal from '../components/Modal';
import './Dashboard.css';

const STATUS_COLUMNS = ['Pending', 'In Progress', 'Completed'];

function Dashboard() {
  const { tasks, addTask, editTask, deleteTask } = useTasks();
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (newTask) => {
    addTask(newTask);
    closeModal();
  };

  const handleEditTask = (updatedTask) => {
    editTask(updatedTask.id, updatedTask);
    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let currentTasks = [...tasks];
    if (filterStatus !== 'All') {
      currentTasks = currentTasks.filter(task => task.status === filterStatus);
    }

    if (searchQuery ){
      currentTasks  = currentTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    currentTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return currentTasks;
  }, [tasks, filterStatus, sortOrder, searchQuery]);

  const groupedTasks = useMemo(() => {
    return {
      Pending: filteredAndSortedTasks.filter(task => task.status === 'Pending'),
      'In Progress': filteredAndSortedTasks.filter(task => task.status === 'In Progress'),
      Completed: filteredAndSortedTasks.filter(task => task.status === 'Completed')
    };
  }, [filteredAndSortedTasks]);

  return (
    <div className="dashboard-container">
      <TaskSummary tasks={tasks} />
      <TaskSearch onSearch={setSearchQuery} />
      <div className="filter-section">
        <TaskFilterSort
          onFilterChange={setFilterStatus}
          onSortChange={setSortOrder}
          currentFilter={filterStatus}
          currentSort={sortOrder}
        />
        <button className="add-task-button" onClick={openAddModal}>+ Add New Task</button>
      </div>

      <div className="kanban-board">
        {STATUS_COLUMNS.map(status => (
          <div className="kanban-column" key={status}>
            <h3 style={{ borderBottom: '1px solid #D9D9D9', paddingBottom: '1.3rem' }}>{status}</h3>
            {groupedTasks[status].map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => openEditModal(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TaskForm
            initialTask={editingTask}
            onSubmit={editingTask ? handleEditTask : handleAddTask}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
