import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth.jsx'

export default function ProtectedRoute({ children }) {
  const auth = useAuth()
  const location = useLocation()
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}


