import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider, AuthProvider, UserProvider } from 'src/providers'
import AppRoutes from 'src/AppRoutes'
import ErrorBoundary from 'src/components/ErrorBoundary'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ErrorProvider>
          <AuthProvider>
            <UserProvider>
              <AppRoutes />
            </UserProvider>
          </AuthProvider>
        </ErrorProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
