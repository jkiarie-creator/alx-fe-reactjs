import './App.css'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import Profile from './components/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider, useAuth } from './components/auth.jsx'

// Auth and ProtectedRoute extracted to components

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a simple app demonstrating React Router setup.</p>
    </div>
  )
}


function BlogPost() {
  const { postId } = useParams()
  return (
    <div>
      <h1>Blog Post</h1>
      <p>Post ID: {postId}</p>
    </div>
  )
}

function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/profile'

  function handleLogin() {
    auth.login()
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Click the button to simulate logging in.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  )
}

function App() {
  const auth = useAuth()
  return (
    <BrowserRouter>
      <header>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/blog/first-post">Sample Blog Post</Link>
          <span style={{ marginLeft: 'auto' }}>
            {auth.isAuthenticated ? (
              <button onClick={auth.logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </span>
        </nav>
      </header>
      <main style={{ paddingTop: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default Root
