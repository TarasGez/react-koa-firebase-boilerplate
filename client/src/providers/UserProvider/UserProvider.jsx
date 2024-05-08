import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { USER_STORAGE_KEY } from 'src/assets/constants'
import { getStorageItem, setStorageItem } from 'src/helpers/localStorage'
import { checkIsAdmin } from 'src/helpers/user'
import { mapUser } from 'src/mappers'

export const UserContext = createContext({
  // eslint-disable-next-line no-unused-vars
  setUserData: (userProviderData) => {
    throw new Error(`Missing UserContext['setUserData'] called with ${userProviderData}`)
  },
  getUserData: () => {
    throw new Error(`Missing UserContext['getUserData']`)
  },
  isAdmin: false,
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return getStorageItem(USER_STORAGE_KEY)
    } catch (e) {
      return null
    }
  })

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      setIsAdmin(checkIsAdmin(user))
    }
  }, [user])

  const handleSetUser = useCallback((userProviderData) => {
    setStorageItem(USER_STORAGE_KEY, userProviderData)
    setUser(userProviderData)
  }, [])

  const handleGetUser = useCallback(() => mapUser(user), [user])

  const value = useMemo(
    () => ({
      setUserData: handleSetUser,
      getUserData: handleGetUser,
      isAdmin,
    }),
    [handleGetUser, handleSetUser, isAdmin]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
