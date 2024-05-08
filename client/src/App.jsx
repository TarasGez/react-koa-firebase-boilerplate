import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider, AuthProvider, UserProvider } from 'src/providers'
import AppRoutes from 'src/AppRoutes'
import { ErrorBoundary, Layout } from './components'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ErrorProvider>
          <AuthProvider>
            <UserProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </UserProvider>
          </AuthProvider>
        </ErrorProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
