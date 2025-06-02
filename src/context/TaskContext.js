import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

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
        case 'SET_TASKS': 
            return action.payload;
        default:
            return state;
    }
};


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState, () => {
        const localData = localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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

export const useTasks = () => {
    return useContext(TaskContext);
};