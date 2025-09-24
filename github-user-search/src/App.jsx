import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'



function NotFoundPage() {
  return (
    <section>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </section>
  )
}

function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <nav className="app-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <small>© {new Date().getFullYear()} GitHub User Search</small>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
