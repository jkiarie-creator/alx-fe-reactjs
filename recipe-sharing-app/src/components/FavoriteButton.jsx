import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium', showText = true }) => {
  const { isFavorite, toggleFavorite } = useRecipeStore(state => ({
    isFavorite: state.isFavorite,
    toggleFavorite: state.toggleFavorite
  }));

  const isFavorited = isFavorite(recipeId);

  const handleToggle = () => {
    toggleFavorite(recipeId);
  };

  const getButtonStyle = () => {
    const baseStyle = {
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease',
      fontWeight: '500'
    };

    const sizeStyles = {
      small: {
        padding: '6px 10px',
        fontSize: '12px'
      },
      medium: {
        padding: '8px 12px',
        fontSize: '14px'
      },
      large: {
        padding: '10px 16px',
        fontSize: '16px'
      }
    };

    const colorStyles = isFavorited ? {
      backgroundColor: '#ff6b6b',
      color: 'white',
      boxShadow: '0 2px 4px rgba(255, 107, 107, 0.3)'
    } : {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      border: '1px solid #dee2e6'
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...colorStyles
    };
  };

  return (
    <button
      onClick={handleToggle}
      style={getButtonStyle()}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span style={{ fontSize: size === 'small' ? '14px' : '16px' }}>
        {isFavorited ? '❤️' : '🤍'}
      </span>
      {showText && (
        <span>
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
