import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  
  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this recipe?')) {
      useRecipeStore.getState().deleteRecipe(recipeId);
      navigate('/recipes');
    }
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
