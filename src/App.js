import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './views/Dashboard';
import CompletedTasksView from './views/CompletedTasksView';
import './App.css';

function App() {
    return (
        <TaskProvider>
            <Router>
                <header className="main-header">
                    <h1>Task Management Dashboard</h1>
                    <nav className='navigation-routes'>
                        <NavLink to="/">All Tasks</NavLink>
                        <NavLink to="/completed">Completed Tasks</NavLink>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/completed" element={<CompletedTasksView />} />
                </Routes>
            </Router>
        </TaskProvider>
    );
}

export default App;