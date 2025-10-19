import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span 
        className="todo-text" 
        onClick={() => onToggle(todo.id)}
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </span>
      <button 
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;
