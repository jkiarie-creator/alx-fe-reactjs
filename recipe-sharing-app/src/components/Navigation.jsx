import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

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
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle('/')}>
        🏠 Home
      </Link>
      <Link to="/recipes" style={linkStyle('/recipes')}>
        📚 All Recipes
      </Link>
      <Link to="/add" style={linkStyle('/add')}>
        ➕ Add Recipe
      </Link>
    </nav>
  );
}
