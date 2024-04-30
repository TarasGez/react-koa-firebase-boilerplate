import { createContext, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from 'src/services/firebase'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from 'src/assets/constants'
import { getStorageItem, removeStorageItem, setStorageItem } from 'src/helpers/localStorage'

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  // eslint-disable-next-line no-unused-vars
  onLogin: (token) => {
    throw new Error(`Missing AuthContext['onLogin'] called with ${JSON.stringify(token)}`)
  },
  onLogout: () => {
    throw new Error("Missing AuthContext['onLogout']")
  },
})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => {
    try {
      return getStorageItem(TOKEN_STORAGE_KEY)
    } catch (e) {
      return null
    }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  const handleLogin = useCallback(
    (token) => {
      setStorageItem(TOKEN_STORAGE_KEY, token)
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
        removeStorageItem(TOKEN_STORAGE_KEY)
        removeStorageItem(USER_STORAGE_KEY)
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
