import { createContext, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from 'src/services/firebase'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from 'src/assets/constants'

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  // eslint-disable-next-line no-unused-vars
  onLogin: (token) => {
    throw new Error(`Missing AuthContext['onLogin']`)
  },
  onLogout: () => {
    throw new Error(`Missing AuthContext['onLogout']`)
  },
})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || '') || null
    } catch (e) {
      return null
    }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  const handleLogin = useCallback(
    (token) => {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token))
      setToken(token)
      setIsAuthenticated(true)
      navigate('/')
    },
    [navigate]
  )

  const handleLogout = useCallback(async () => {
    signOut(auth)
      .then(() => {
        setToken(null)
        setIsAuthenticated(false)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        localStorage.removeItem(USER_STORAGE_KEY)
        console.log('logout success!')
        navigate('/')
      })
      .catch((error) => {
        console.log('error logout: ', error)
      })
  }, [navigate])

  const value = useMemo(
    () => ({
      token,
      isAuthenticated,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    [handleLogin, handleLogout, isAuthenticated, token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
