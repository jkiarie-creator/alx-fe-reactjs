import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const { 
    filteredRecipes, 
    recipes, 
    searchTerm, 
    initializeFilteredRecipes 
  } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes,
    recipes: state.recipes,
    searchTerm: state.searchTerm,
    initializeFilteredRecipes: state.initializeFilteredRecipes
  }));

  // Initialize filtered recipes when component mounts
  useEffect(() => {
    if (filteredRecipes.length === 0 && recipes.length > 0) {
      initializeFilteredRecipes();
    }
  }, [recipes.length, filteredRecipes.length, initializeFilteredRecipes]);

  const cardStyle = {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease'
  };

  const titleStyle = {
    margin: '0 0 10px 0',
    color: '#212529',
    fontSize: '24px'
  };

  const descriptionStyle = {
    margin: '0 0 15px 0',
    color: '#6c757d',
    lineHeight: '1.6',
    fontSize: '16px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  };

  const buttonStyle = (variant) => ({
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ...(variant === 'primary' ? {
      backgroundColor: '#007bff',
      color: 'white'
    } : {
      backgroundColor: '#28a745',
      color: 'white'
    })
  });

  // Show different messages based on search state
  const getEmptyStateMessage = () => {
    if (searchTerm && filteredRecipes.length === 0) {
      return {
        title: 'No recipes found',
        message: `No recipes match "${searchTerm}". Try a different search term.`,
        showAddButton: false
      };
    } else if (recipes.length === 0) {
      return {
        title: 'No recipes found',
        message: 'Start building your recipe collection by adding your first recipe.',
        showAddButton: true
      };
    }
    return null;
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#495057', margin: 0 }}>
          {searchTerm ? `Search Results (${filteredRecipes.length})` : `All Recipes (${filteredRecipes.length})`}
        </h2>
        <Link 
          to="/add"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          ➕ Add New Recipe
        </Link>
      </div>

      {emptyState ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>
            {emptyState.title}
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            {emptyState.message}
          </p>
          {emptyState.showAddButton && (
            <Link 
              to="/add"
              style={{ 
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Add Your First Recipe
            </Link>
          )}
        </div>
      ) : (
        <div>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <h3 style={titleStyle}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {recipe.title}
                </Link>
              </h3>
              <p style={descriptionStyle}>{recipe.description}</p>
              <div style={buttonContainerStyle}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={buttonStyle('primary')}
                >
                  👁️ View Details
                </Link>
                <Link 
                  to={`/edit/${recipe.id}`}
                  style={buttonStyle('secondary')}
                >
                  ✏️ Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  