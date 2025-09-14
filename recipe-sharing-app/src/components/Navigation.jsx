import { Link, useLocation } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export default function Navigation() {
  const location = useLocation();
  const { favorites } = useRecipeStore(state => ({
    favorites: state.favorites || []
  }));

  const navStyle = {
    marginBottom: '20px',
    padding: '15px',
    borderBottom: '2px solid #e9ecef',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  };

  const linkStyle = (path) => ({
    marginRight: '25px',
    textDecoration: 'none',
    color: location.pathname === path ? '#007bff' : '#6c757d',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    position: 'relative'
  });

  const badgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle('/')}>
        🏠 Home
      </Link>
      <Link to="/recipes" style={linkStyle('/recipes')}>
        📚 All Recipes
      </Link>
      <Link to="/favorites" style={linkStyle('/favorites')}>
        ❤️ Favorites
        {favorites.length > 0 && (
          <span style={badgeStyle}>
            {favorites.length}
          </span>
        )}
      </Link>
      <Link to="/recommendations" style={linkStyle('/recommendations')}>
        ✨ Recommendations
      </Link>
      <Link to="/add" style={linkStyle('/add')}>
        ➕ Add Recipe
      </Link>
    </nav>
  );
}
