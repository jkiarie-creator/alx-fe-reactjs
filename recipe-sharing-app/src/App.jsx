import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#6c6c6d',
        width: '100%'
      }}>
        <div style={{ 
          width: '100%',
          backgroundColor: 'white',
          minHeight: '100vh'
        }}>
          <div style={{ padding: '30px' }}>
            <h1 style={{ 
              textAlign: 'center', 
              color: '#495057', 
              marginBottom: '30px',
              fontSize: '36px',
              fontWeight: 'bold'
            }}>
              Recipe Sharing App
            </h1>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/favorites" element={<FavoritesList />} />
              <Route path="/recommendations" element={<RecommendationsList />} />
              <Route path="/add" element={<AddRecipeForm />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/edit/:id" element={<EditRecipeForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
