import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
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


