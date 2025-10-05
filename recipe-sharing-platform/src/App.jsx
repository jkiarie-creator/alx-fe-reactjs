import { useState } from 'react';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
    // In a real app, you would also save to an API here
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              <Link to="/" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                Recipe Sharing Platform
              </Link>
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-800 font-bold">Welcome to our recipe sharing community!</p>
            <p className="text-gray-600 mt-2">Discover amazing recipes or share your own culinary creations.</p>
          </div>

          <Routes>
            <Route path="/" element={<HomePage recipes={recipes} />} />
            
            <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
            <Route 
              path="/add-recipe" 
              element={<AddRecipeForm onAddRecipe={handleAddRecipe} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
