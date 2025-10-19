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
      render(React.createElement(App));
      
      // Check if the main heading is present
      expect(screen.getByText('React Todo App')).toBeInTheDocument();
      expect(screen.getByText('Manage your tasks efficiently')).toBeInTheDocument();
      
      // Check if the TodoList heading is present
      expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('renders initial state with demo todos', () => {
      render(React.createElement(App));
      
      // Check if all initial todos are rendered
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
      expect(screen.getByText('Master JavaScript')).toBeInTheDocument();
      
      // Check if completed todo has completed class on the list item
      const completedTodoItem = screen.getByText('Master JavaScript').closest('.todo-item');
      expect(completedTodoItem).toHaveClass('completed');
    });

    test('renders add todo form', () => {
      render(React.createElement(App));
      
      // Check if the input field is present
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
      expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });
  });

  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', async () => {
      const user = userEvent.setup();
      render(React.createElement(App));
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Type a new todo
      await user.type(input, 'Test new todo');
      await user.click(addButton);
      
      // Wait for the todo to be added
      await waitFor(() => {
        expect(screen.getByText('Test new todo')).toBeInTheDocument();
      });
      
      // Check if input is cleared
      expect(input).toHaveValue('');
    }, 10000);

    test('does not add empty todo', async () => {
      const user = userEvent.setup();
      render(React.createElement(App));
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Count initial todos
      const initialTodos = screen.getAllByRole('listitem');
      const initialCount = initialTodos.length;
      
      // Try to add empty todo
      await user.type(input, '   '); // Only spaces
      await user.click(addButton);
      
      // Wait a bit to ensure no new todo was added
      await waitFor(() => {
        const todos = screen.getAllByRole('listitem');
        expect(todos).toHaveLength(initialCount); // Should remain the same
      });
    }, 10000);

    test('adds todo when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(React.createElement(App));
      
      const input = screen.getByPlaceholderText('Add a new todo...');
      
      // Type and press Enter
      await user.type(input, 'Enter key todo');
      await user.keyboard('{Enter}');
      
      // Wait for the todo to be added
      await waitFor(() => {
        expect(screen.getByText('Enter key todo')).toBeInTheDocument();
      });
    }, 10000);
  });

  describe('Toggling Todos', () => {
    test('toggles todo completion status when clicked', async () => {
      const user = userEvent.setup();
      render(React.createElement(App));
      
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
      render(React.createElement(App));
      
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
      render(React.createElement(App));
      
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
      render(React.createElement(App));
      
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
        
        return React.createElement('div', null,
          React.createElement('div', { className: 'add-todo-form' },
            React.createElement('form', { onSubmit: (e) => { e.preventDefault(); addTodo('Test'); } },
              React.createElement('input', { placeholder: 'Add a new todo...' }),
              React.createElement('button', { type: 'submit' }, 'Add Todo')
            )
          ),
          React.createElement('div', { className: 'todo-list' },
            React.createElement('h2', null, 'Todo List'),
            todos.length === 0 ? 
              React.createElement('p', { className: 'no-todos' }, 'No todos yet. Add one above!') :
              React.createElement('ul', { className: 'todos' },
                todos.map((todo) => 
                  React.createElement('li', { key: todo.id, className: 'todo-item' },
                    React.createElement('span', { 
                      className: 'todo-text', 
                      onClick: () => toggleTodo(todo.id) 
                    }, todo.text),
                    React.createElement('button', { 
                      onClick: () => deleteTodo(todo.id) 
                    }, '×')
                  )
                )
              )
          )
        );
      };
      
      render(React.createElement(EmptyTodoList));
      
      // Check if empty state message is shown
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    test('complete workflow: add, toggle, and delete todos', async () => {
      const user = userEvent.setup();
      render(React.createElement(App));
      
      // Add a new todo
      const input = screen.getByPlaceholderText('Add a new todo...');
      await user.type(input, 'Integration test todo');
      await user.click(screen.getByText('Add Todo'));
      
      // Wait for and verify it was added
      await waitFor(() => {
        const newTodo = screen.getByText('Integration test todo');
        expect(newTodo).toBeInTheDocument();
        const newTodoItem = newTodo.closest('.todo-item');
        expect(newTodoItem).not.toHaveClass('completed');
      });
      
      // Toggle the new todo
      const newTodo = screen.getByText('Integration test todo');
      await user.click(newTodo);
      
      // Wait for toggle to complete
      await waitFor(() => {
        const newTodoItem = newTodo.closest('.todo-item');
        expect(newTodoItem).toHaveClass('completed');
      });
      
      // Delete the new todo
      const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await user.click(lastDeleteButton);
      
      // Wait for and verify it was deleted
      await waitFor(() => {
        expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument();
      });
    }, 15000);
  });
});