import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = () => {
      try {
        // Simulate API call with a timeout
        setTimeout(() => {
          const foundRecipe = recipeData.find(r => r.id === parseInt(id));
          if (foundRecipe) {
            setRecipe(foundRecipe);
          } else {
            setError('Recipe not found');
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load recipe');
        setLoading(false);
        console.error('Error fetching recipe:', err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Recipes
        </button>
        <div className="bg-emerald-50 rounded-2xl shadow-md overflow-hidden">
          {/* Recipe Header */}
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img 
                className="h-64 w-full object-cover md:h-full" 
                src={recipe.image} 
                alt={recipe.title} 
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-emerald-600 font-semibold">
                {recipe.difficulty} • {recipe.prepTime} prep • {recipe.cookTime} cook
                {recipe.marinationTime && ` • ${recipe.marinationTime} marination`}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-800">{recipe.title}</h1>
              <p className="mt-3 text-gray-500">{recipe.summary}</p>
              
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                  <svg className="h-5 w-5 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-xs font-medium text-gray-500">PREP</div>
                  <div className="text-sm font-semibold text-gray-800">{recipe.prepTime}</div>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                  <svg className="h-5 w-5 text-yellow-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <div className="text-xs font-medium text-gray-500">COOK</div>
                  <div className="text-sm font-semibold text-gray-800">{recipe.cookTime}</div>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                  <svg className="h-5 w-5 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div className="text-xs font-medium text-gray-500">SERVES</div>
                  <div className="text-sm font-semibold text-gray-800">{recipe.servings}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="px-6 sm:px-8 lg:px-10 py-8">
            <div className="border-t border-gray-100 pt-8">
              <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
                {/* Ingredients */}
                <div className="w-full md:w-1/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
                  <ul className="space-y-3 pl-0">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start group">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
                  <ol className="space-y-6 pl-0">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex items-start group">
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold mr-4 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 flex-1 pt-0.5 group-hover:text-gray-800 transition-colors">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;