import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import TaskSummary from '../components/TaskSummary';
import TaskFilterSort from '../components/TaskFilterSort';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import './Dashboard.css';

const STATUS_COLUMNS = ['Pending', 'In Progress', 'Completed'];

function Dashboard() {
  const { tasks, addTask, editTask, deleteTask } = useTasks();
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

    currentTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return currentTasks;
  }, [tasks, filterStatus, sortOrder]);

  const groupedTasks = useMemo(() => {
    return {
      Pending: filteredAndSortedTasks.filter(task => task.status === 'Pending'),
      'In Progress': filteredAndSortedTasks.filter(task => task.status === 'In Progress'),
      Completed: filteredAndSortedTasks.filter(task => task.status === 'Completed')
    };
  }, [filteredAndSortedTasks]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const draggedTask = tasks.find(task => String(task.id) === draggableId);
    if (draggedTask) {
      editTask(draggedTask.id, { ...draggedTask, status: destination.droppableId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dashboard-container">
        <TaskSummary tasks={tasks} />
        <button className="add-task-button" onClick={openAddModal}>+ Add New Task</button>
        <TaskFilterSort
          onFilterChange={setFilterStatus}
          onSortChange={setSortOrder}
          currentFilter={filterStatus}
          currentSort={sortOrder}
        />

        <div className="kanban-board">
          {STATUS_COLUMNS.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{status}</h3>
                  {groupedTasks[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)} // Force string
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={() => openEditModal(task)}
                            onDelete={() => handleDeleteTask(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
    </DragDropContext>
  );
}

export default Dashboard;
