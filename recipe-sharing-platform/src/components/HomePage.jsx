import { useState, useEffect } from 'react';
import recipeData from '../data.json';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with a timeout
    const fetchRecipes = async () => {
      try {
        // Using local data for this 
        setTimeout(() => {
          setRecipes(recipeData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load recipes');
        setLoading(false);
        console.error('Error fetching recipes:', err);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Delicious Kenyan Recipes</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className=" gradient-to-b from-emerald-50 to-emerald-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-gray-800 text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  className="inline-block text-emerald-600 hover:text-emerald-800 font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;