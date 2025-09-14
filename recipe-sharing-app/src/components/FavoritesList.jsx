import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

export default function FavoritesList() {
  const { recipes, favorites } = useRecipeStore(state => ({
    recipes: state.recipes,
    favorites: state.favorites
  }));

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  const cardStyle = {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    position: 'relative'
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
    marginTop: '15px',
    flexWrap: 'wrap'
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    ...(variant === 'primary' ? {
      backgroundColor: '#007bff',
      color: 'white'
    } : variant === 'secondary' ? {
      backgroundColor: '#28a745',
      color: 'white'
    } : {
      backgroundColor: '#6c757d',
      color: 'white'
    })
  });

  const favoriteBadgeStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#495057', margin: 0 }}>
          My Favorite Recipes ({favoriteRecipes.length})
        </h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          <span>❤️</span>
          <span>Recipes you love</span>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>❤️</div>
          <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>
            No favorite recipes yet
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            Start building your collection by adding recipes to your favorites. 
            Click the heart icon on any recipe to add it here!
          </p>
          <Link 
            to="/recipes"
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
            Browse All Recipes
          </Link>
        </div>
      ) : (
        <div>
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <div style={favoriteBadgeStyle}>
                FAVORITE
              </div>
              
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
                <FavoriteButton 
                  recipeId={recipe.id} 
                  size="small" 
                  showText={true}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
