import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    useRecipeStore.getState().updateRecipe(parseInt(id), { 
      title: title.trim(), 
      description: description.trim() 
    });
    navigate(`/recipe/${id}`);
  };

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/recipes')}>
          Back to Recipes
        </button>
      </div>
    );
  }

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
    backgroundColor: '#28a745',
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
        Edit Recipe
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
            style={textareaStyle}
            required
          />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button type="submit" style={buttonStyle}>
            💾 Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/recipe/${id}`)}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}