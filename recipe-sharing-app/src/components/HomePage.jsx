import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';

export default function HomePage() {
  const { recipes, favorites, recommendations } = useRecipeStore(state => ({
    recipes: state.recipes || [],
    favorites: state.favorites || [],
    recommendations: state.recommendations || []
  }));
  
  const recentRecipes = recipes.slice(-3).reverse(); // Show last 3 recipes, newest first
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id)).slice(0, 3); // Show first 3 favorites
  const recommendedRecipes = recommendations.slice(0, 3); // Show first 3 recommendations

  const cardStyle = {
    marginBottom: '15px',
    padding: '15px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease'
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#495057', marginBottom: '10px' }}>
          Welcome to Recipe Sharing App
        </h2>
        <p style={{ color: '#6c757d', fontSize: '18px', marginBottom: '20px' }}>
          Share and discover amazing recipes with the community!
        </p>
        <SearchBar />
      </div>
      
      {/* Favorites Section */}
      {favoriteRecipes.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#495057', margin: 0 }}>
              ❤️ Your Favorites ({favoriteRecipes.length})
            </h3>
            <Link 
              to="/favorites"
              style={{ 
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              View All Favorites →
            </Link>
          </div>
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <h4 style={{ margin: '0 0 10px 0', color: '#212529' }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#007bff',
                    fontSize: '20px'
                  }}
                >
                  {recipe.title}
                </Link>
              </h4>
              <p style={{ 
                margin: '0 0 15px 0', 
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.5'
              }}>
                {recipe.description.length > 120 
                  ? `${recipe.description.substring(0, 120)}...` 
                  : recipe.description
                }
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations Section */}
      {recommendedRecipes.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#495057', margin: 0 }}>
              ✨ Recommended for You ({recommendedRecipes.length})
            </h3>
            <Link 
              to="/recommendations"
              style={{ 
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              View All Recommendations →
            </Link>
          </div>
          {recommendedRecipes.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <h4 style={{ margin: '0 0 10px 0', color: '#212529' }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#007bff',
                    fontSize: '20px'
                  }}
                >
                  {recipe.title}
                </Link>
              </h4>
              <p style={{ 
                margin: '0 0 15px 0', 
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.5'
              }}>
                {recipe.description.length > 120 
                  ? `${recipe.description.substring(0, 120)}...` 
                  : recipe.description
                }
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Recipes Section */}
      {recentRecipes.length > 0 ? (
        <div>
          <h3 style={{ color: '#495057', marginBottom: '20px' }}>
            Recent Recipes ({recentRecipes.length})
          </h3>
          {recentRecipes.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <h4 style={{ margin: '0 0 10px 0', color: '#212529' }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#007bff',
                    fontSize: '20px'
                  }}
                >
                  {recipe.title}
                </Link>
              </h4>
              <p style={{ 
                margin: '0 0 15px 0', 
                fontSize: '14px',
                color: '#6c757d',
                lineHeight: '1.5'
              }}>
                {recipe.description.length > 120 
                  ? `${recipe.description.substring(0, 120)}...` 
                  : recipe.description
                }
              </p>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{ 
                  color: '#007bff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Read more →
              </Link>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link 
              to="/recipes"
              style={{ 
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            >
              View All Recipes
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>
            No recipes yet!
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            Be the first to share a delicious recipe with the community.
          </p>
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
        </div>
      )}
    </div>
  );
}
