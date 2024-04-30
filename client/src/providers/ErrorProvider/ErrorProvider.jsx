import { createContext } from 'react'

export const ErrorContext = createContext({
  setError: (error) => {
    throw new Error(`Missing ErrorContext['setError'] called with ${JSON.stringify(error)}`)
  },
})

export const ErrorProvider = ({ children }) => {
  const setError = (error) => {
    console.error('ErrorProvider: ', error)
  }
  const value = {
    setError,
  }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
