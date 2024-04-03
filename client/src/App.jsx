import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, UserProvider } from 'src/providers'
import AppRoutes from 'src/AppRoutes'
import ErrorBoundary from 'src/components/ErrorBoundary'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
