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

function ProtectedRoute({ element }) {
  const token = localStorage.getItem('token')
  return token ? element : <Navigate to="/auth" replace />
}

function AuthRedirect({ element }) {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/dashboard" replace /> : element
}

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    protected: false,
  },
  {
    path: '/auth',
    element: <AuthRedirect element={<AuthPage />} />,
    protected: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true,
  },
  {
    path: '/add-transaction',
    element: <AddTransaction />,
    protected: true,
  },
  {
    path: '/transactions',
    element: <TransactionsHistory />,
    protected: true,
  },
  {
    path: '/analytics',
    element: <Analytics />,
    protected: true,
  },
  {
    path: '/profile',
    element: <ProfileSettings />,
    protected: true,
  },
]

const router = createBrowserRouter(
  routes.map(({ path, element, protected: isProtected }) => ({
    path,
    element: (
      <PagesWrapper>
        <Header />
        <RouteTransition>
          {isProtected ? <ProtectedRoute element={element} /> : element}
        </RouteTransition>
      </PagesWrapper>
    ),
  }))
)

function App() {
  return <RouterProvider router={router} />
}

export default App