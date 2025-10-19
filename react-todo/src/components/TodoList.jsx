import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Toggle visibility of completed todos
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      
      {/* Filter controls */}
      <div className="filter-controls">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Active ({todos.filter(todo => !todo.completed).length})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Completed ({todos.filter(todo => todo.completed).length})
          </button>
        </div>
        
        <button 
          className="toggle-completed"
          onClick={toggleShowCompleted}
        >
          {showCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="no-todos">
          {filter === 'all' ? 'No todos yet. Add one above!' : 
           filter === 'active' ? 'No active todos!' : 
           'No completed todos!'}
        </p>
      ) : (
        <ul className="todos">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
