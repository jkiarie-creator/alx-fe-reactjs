import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail'  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Recipe Sharing Platform</h1>
        <div className="bg-emerald-50 rounded-lg shadow-md p-6">
          <p className="text-gray-800 font-bold mb-4">Welcome to our recipe sharing community!</p>
        </div>
      </div>
      <Router>
        <Routes>
          <Route  path="/" element={<HomePage />}/>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
