import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

// 1. Initial State
const initialState = [];

// 2. Reducer Function
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: uuidv4(), ...action.payload }];
        case 'EDIT_TASK':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, ...action.payload.updatedTask } : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload.id);
        case 'SET_TASKS': // For loading from localStorage
            return action.payload;
        default:
            return state;
    }
};

// 3. Create Context
export const TaskContext = createContext();

// 4. Task Provider Component
export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState, () => {
        // Initialize state from localStorage
        const localData = localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : initialState;
    });

    // 5. Persist tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Value to be provided to consumers
    const contextValue = {
        tasks,
        addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
        editTask: (id, updatedTask) => dispatch({ type: 'EDIT_TASK', payload: { id, updatedTask } }),
        deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: { id } }),
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

// 6. Custom Hook for easier consumption (optional but good practice)
export const useTasks = () => {
    return useContext(TaskContext);
};