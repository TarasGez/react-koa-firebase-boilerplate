import { createContext, useCallback, useMemo, useState } from 'react'
import { USER_STORAGE_KEY } from 'src/assets/constants'
import { getStorageItem, setStorageItem } from 'src/helpers/localStorage'
import { mapUser } from 'src/mappers'

export const UserContext = createContext({
  // eslint-disable-next-line no-unused-vars
  setUserData: (userProviderData) => {
    throw new Error(`Missing UserContext['setUserData']`)
  },
  getUserData: () => {
    throw new Error(`Missing UserContext['getUserData']`)
  },
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return getStorageItem(USER_STORAGE_KEY)
    } catch (e) {
      return null
    }
  })

  const handleSetUser = useCallback((userProviderData) => {
    setStorageItem(USER_STORAGE_KEY, userProviderData)
    setUser(userProviderData)
  }, [])

  const handleGetUser = useCallback(() => mapUser(user), [user])

  const value = useMemo(
    () => ({
      setUserData: handleSetUser,
      getUserData: handleGetUser,
    }),
    [handleGetUser, handleSetUser]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
