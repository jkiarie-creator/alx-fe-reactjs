import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

export default function RecommendationsList() {
  const { 
    recommendations, 
    favorites, 
    generateRecommendations, 
    initializeRecommendations 
  } = useRecipeStore(state => ({
    recommendations: state.recommendations,
    favorites: state.favorites,
    generateRecommendations: state.generateRecommendations,
    initializeRecommendations: state.initializeRecommendations
  }));

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    initializeRecommendations();
  }, [favorites.length, initializeRecommendations]);

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

  const recommendationBadgeStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#17a2b8',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const refreshButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease'
  };

  const getRecommendationMessage = () => {
    if (favorites.length === 0) {
      return {
        title: "Discover New Recipes",
        message: "We're showing you the most recent recipes. Add some recipes to your favorites to get personalized recommendations!",
        icon: "🔍"
      };
    } else {
      return {
        title: "Recommended for You",
        message: `Based on your ${favorites.length} favorite recipe${favorites.length === 1 ? '' : 's'}, here are some suggestions you might enjoy!`,
        icon: "✨"
      };
    }
  };

  const message = getRecommendationMessage();

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#495057', margin: 0 }}>
          {message.title} ({recommendations.length})
        </h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={generateRecommendations}
            style={refreshButtonStyle}
            title="Refresh recommendations"
          >
            🔄 Refresh
          </button>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: '#6c757d',
            fontSize: '14px'
          }}>
            <span>{message.icon}</span>
            <span>Personalized</span>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#e7f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#004085'
      }}>
        <strong>{message.icon} {message.title}:</strong> {message.message}
      </div>

      {recommendations.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤔</div>
          <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>
            No recommendations available
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            We need more recipes to generate personalized recommendations. 
            Try adding some recipes first!
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
              fontWeight: '500',
              marginRight: '10px'
            }}
          >
            Add Recipe
          </Link>
          <Link 
            to="/recipes"
            style={{ 
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div>
          {recommendations.map(recipe => (
            <div key={recipe.id} style={cardStyle}>
              <div style={recommendationBadgeStyle}>
                RECOMMENDED
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
