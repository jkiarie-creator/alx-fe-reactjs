import { useState } from 'react';
  import { useRecipeStore } from './recipeStore';

  export default function AddRecipeForm() {
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      addRecipe({ id: Date.now(), title, description });
      setTitle('');
      setDescription('');
    };

    return (
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Add New Recipe</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            style={{ width: '100%', padding: '8px', height: '80px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Recipe</button>
      </form>
    );
  };
  