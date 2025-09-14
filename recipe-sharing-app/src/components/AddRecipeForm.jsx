import { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

export default function AddRecipeForm() {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newRecipe = { 
      id: Date.now(), 
      title: title.trim(), 
      description: description.trim() 
    };
    addRecipe(newRecipe);
    setTitle('');
    setDescription('');
    navigate(`/recipe/${newRecipe.id}`);
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    marginRight: '10px'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d'
  };

  return (
    <div style={formStyle}>
      <h2 style={{ color: '#495057', marginBottom: '25px', textAlign: 'center' }}>
        Add New Recipe
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#495057'
          }}>
            Recipe Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title..."
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#495057'
          }}>
            Recipe Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe, ingredients, and cooking instructions..."
            style={textareaStyle}
            required
          />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button type="submit" style={buttonStyle}>
            ➕ Add Recipe
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
  