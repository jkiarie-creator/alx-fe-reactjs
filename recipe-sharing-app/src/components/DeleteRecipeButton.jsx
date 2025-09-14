import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      useRecipeStore.getState().deleteRecipe(recipeId);
      navigate('/recipes');
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{
        padding: '12px 24px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
      }}
    >
      🗑️ Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
