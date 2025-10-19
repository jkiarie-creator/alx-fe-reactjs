import { useState } from 'react'
import './App.css'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'

function App() {
  // Static array of initial todos
  const initialTodos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master JavaScript', completed: true }
  ];

  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Simple ID generation
      text,
      completed: false
    };
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
    <div className="app">
      <header className="app-header">
        <h1>React Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      
      <main className="app-main">
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList 
          todos={todos} 
          onToggleTodo={toggleTodo} 
          onDeleteTodo={deleteTodo} 
        />
      </main>
    </div>
  )
}

export default App
