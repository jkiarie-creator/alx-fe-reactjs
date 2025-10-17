import './App.css'
import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom'

// Simple auth context to simulate authentication
const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function login() {
    setIsAuthenticated(true)
  }

  function logout() {
    setIsAuthenticated(false)
  }

  const value = { isAuthenticated, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

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

function ProfileLayout() {
  return (
    <div>
      <h1>Profile</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <div style={{ paddingTop: '1rem' }}>
        <Outlet />
      </div>
    </div>
  )
}

function ProfileDetails() {
  return (
    <div>
      <h2>Profile Details</h2>
      <p>Basic information about the user.</p>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Manage your preferences and account settings.</p>
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
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="/blog/:postId" element={<BlogPost />} />
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
