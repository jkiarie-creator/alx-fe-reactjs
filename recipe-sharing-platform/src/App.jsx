import HomePage from './components/HomePage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Recipe Sharing Platform</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Welcome to our recipe sharing community!</p>
        </div>
      </div>
      <HomePage />
    </div>
  )
}

export default App
