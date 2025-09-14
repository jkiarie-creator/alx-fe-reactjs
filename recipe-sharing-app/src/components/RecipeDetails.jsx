import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>
          Recipe not found
        </h2>
        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
          The recipe you're looking for doesn't exist or has been deleted.
        </p>
        <button 
          onClick={() => navigate('/recipes')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const backButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px'
  };

  const titleStyle = {
    color: '#212529',
    marginBottom: '15px',
    fontSize: '32px',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    color: '#495057',
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '30px',
    whiteSpace: 'pre-wrap'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #dee2e6'
  };

  const buttonStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'inline-block'
  };

  return (
    <div style={containerStyle}>
      <button 
        onClick={() => navigate('/recipes')}
        style={backButtonStyle}
      >
        ← Back to Recipes
      </button>
      
      <h1 style={titleStyle}>{recipe.title}</h1>
      <p style={descriptionStyle}>{recipe.description}</p>
      
      <div style={buttonContainerStyle}>
        <button 
          onClick={() => navigate(`/edit/${recipe.id}`)}
          style={{
            ...buttonStyle,
            backgroundColor: '#28a745',
            color: 'white'
          }}
        >
          ✏️ Edit Recipe
        </button>
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
