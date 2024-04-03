import { useContext } from 'react'
import { UserContext } from './UserProvider'

export const useUserData = () => useContext(UserContext)
