import React from 'react';


function TaskSearch({ onSearch }) {
    return (
        <div className="search-container"> 
            <input type="text" placeholder="Search tasks..." onChange={(e) => onSearch(e.target.value)} /> 
        </div>
    );
}

export default TaskSearch;