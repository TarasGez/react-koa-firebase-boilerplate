import { useContext } from 'react'
import { ErrorContext } from './ErrorProvider'

export const useError = () => useContext(ErrorContext)
