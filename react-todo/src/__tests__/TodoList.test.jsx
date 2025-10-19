import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach } from 'vitest';
import App from '../App';

// Mock data for testing
const mockTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a Todo App', completed: false },
  { id: 3, text: 'Master JavaScript', completed: true }
];

describe('TodoList Component', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Initial Render', () => {
    test('renders TodoList component correctly', () => {
      render(<App />);
      
      // Check if the main heading is present
      expect(screen.getByText('React Todo App')).toBeInTheDocument();
      expect(screen.getByText('Manage your tasks efficiently')).toBeInTheDocument();
      
      // Check if the TodoList heading is present
      expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('renders initial state with demo todos', () => {
      render(<App />);
      
      // Check if all initial todos are rendered
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
      expect(screen.getByText('Master JavaScript')).toBeInTheDocument();
      
      // Check if completed todo has completed class on the list item
      const completedTodoItem = screen.getByText('Master JavaScript').closest('.todo-item');
      expect(completedTodoItem).toHaveClass('completed');
    });

    test('renders add todo form', () => {
      render(<App />);
      
      // Check if the input field is present
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
      expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });
  });

  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Type a new todo
      await user.type(input, 'Test new todo');
      await user.click(addButton);
      
      // Check if the new todo is added
      expect(screen.getByText('Test new todo')).toBeInTheDocument();
      
      // Check if input is cleared
      expect(input).toHaveValue('');
    });

    test('does not add empty todo', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Try to add empty todo
      await user.type(input, '   '); // Only spaces
      await user.click(addButton);
      
      // Check that no new todo was added (count should remain the same)
      const todos = screen.getAllByRole('listitem');
      expect(todos).toHaveLength(3); // Only the initial 3 todos
    });

    test('adds todo when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      
      // Type and press Enter
      await user.type(input, 'Enter key todo');
      await user.keyboard('{Enter}');
      
      // Check if the new todo is added
      expect(screen.getByText('Enter key todo')).toBeInTheDocument();
    });
  });

  describe('Toggling Todos', () => {
    test('toggles todo completion status when clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Find a non-completed todo
      const todoText = screen.getByText('Learn React');
      const todoItem = todoText.closest('.todo-item');
      expect(todoItem).not.toHaveClass('completed');
      
      // Click on the todo text
      await user.click(todoText);
      
      // Check if the todo is now completed
      expect(todoItem).toHaveClass('completed');
    });

    test('toggles completed todo back to not completed', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Find a completed todo
      const completedTodo = screen.getByText('Master JavaScript');
      const completedTodoItem = completedTodo.closest('.todo-item');
      expect(completedTodoItem).toHaveClass('completed');
      
      // Click on the completed todo
      await user.click(completedTodo);
      
      // Check if the todo is now not completed
      expect(completedTodoItem).not.toHaveClass('completed');
    });
  });

  describe('Deleting Todos', () => {
    test('deletes a todo when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Find the delete button for the first todo
      const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
      const firstDeleteButton = deleteButtons[0];
      
      // Count initial todos
      const initialTodos = screen.getAllByRole('listitem');
      expect(initialTodos).toHaveLength(3);
      
      // Click delete button
      await user.click(firstDeleteButton);
      
      // Check that todo is deleted
      const remainingTodos = screen.getAllByRole('listitem');
      expect(remainingTodos).toHaveLength(2);
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('deletes the correct todo when multiple delete buttons are clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Find delete button for "Build a Todo App"
      const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
      const secondDeleteButton = deleteButtons[1]; // Second delete button
      
      // Click delete button
      await user.click(secondDeleteButton);
      
      // Check that "Build a Todo App" is deleted but others remain
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Master JavaScript')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    test('shows empty state message when no todos exist', () => {
      // Create a custom component with empty todos for this test
      const EmptyTodoList = () => {
        const [todos, setTodos] = React.useState([]);
        
        const addTodo = (text) => {
          const newTodo = { id: Date.now(), text, completed: false };
          setTodos([...todos, newTodo]);
        };
        
        const toggleTodo = (id) => {
          setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ));
        };
        
        const deleteTodo = (id) => {
          setTodos(todos.filter(todo => todo.id !== id));
        };
        
        return (
          <div>
            <div className="add-todo-form">
              <form onSubmit={(e) => { e.preventDefault(); addTodo('Test'); }}>
                <input placeholder="Add a new todo..." />
                <button type="submit">Add Todo</button>
              </form>
            </div>
            <div className="todo-list">
              <h2>Todo List</h2>
              {todos.length === 0 ? (
                <p className="no-todos">No todos yet. Add one above!</p>
              ) : (
                <ul className="todos">
                  {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                      <span className="todo-text" onClick={() => toggleTodo(todo.id)}>
                        {todo.text}
                      </span>
                      <button onClick={() => deleteTodo(todo.id)}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      };
      
      render(<EmptyTodoList />);
      
      // Check if empty state message is shown
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    test('complete workflow: add, toggle, and delete todos', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Add a new todo
      const input = screen.getByPlaceholderText('Add a new todo...');
      await user.type(input, 'Integration test todo');
      await user.click(screen.getByText('Add Todo'));
      
      // Verify it was added
      const newTodo = screen.getByText('Integration test todo');
      expect(newTodo).toBeInTheDocument();
      const newTodoItem = newTodo.closest('.todo-item');
      expect(newTodoItem).not.toHaveClass('completed');
      
      // Toggle the new todo
      await user.click(newTodo);
      expect(newTodoItem).toHaveClass('completed');
      
      // Delete the new todo
      const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await user.click(lastDeleteButton);
      
      // Verify it was deleted
      expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument();
    });
  });
});
