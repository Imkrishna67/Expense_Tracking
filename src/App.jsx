import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import PagesWrapper, { Header } from './components/PagesWrapper'
import RouteTransition from './components/RouteTransition'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import TransactionsHistory from './pages/TransactionsHistory'
import Analytics from './pages/Analytics'
import ProfileSettings from './pages/ProfileSettings'
import './App.css'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  return token ? children : <Navigate to="/auth" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('token')
      ? <Navigate to="/dashboard" replace />
      : (
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <LandingPage />
          </RouteTransition>
        </PagesWrapper>
      ),
  },

  {
    path: '/auth',
    element: localStorage.getItem('token')
      ? <Navigate to="/dashboard" replace />
      : (
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <AuthPage />
          </RouteTransition>
        </PagesWrapper>
      ),
  },

  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <Dashboard />
          </RouteTransition>
        </PagesWrapper>
      </ProtectedRoute>
    ),
  },

  {
    path: '/add-transaction',
    element: (
      <ProtectedRoute>
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <AddTransaction />
          </RouteTransition>
        </PagesWrapper>
      </ProtectedRoute>
    ),
  },

  {
    path: '/transactions',
    element: (
      <ProtectedRoute>
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <TransactionsHistory />
          </RouteTransition>
        </PagesWrapper>
      </ProtectedRoute>
    ),
  },

  {
    path: '/analytics',
    element: (
      <ProtectedRoute>
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <Analytics />
          </RouteTransition>
        </PagesWrapper>
      </ProtectedRoute>
    ),
  },

  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <PagesWrapper>
          <Header />
          <RouteTransition>
            <ProfileSettings />
          </RouteTransition>
        </PagesWrapper>
      </ProtectedRoute>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App