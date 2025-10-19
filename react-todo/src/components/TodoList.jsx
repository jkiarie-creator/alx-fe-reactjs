import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p className="no-todos">No todos yet. Add one above!</p>
      ) : (
        <ul className="todos">
          {todos.map((todo) => (
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
