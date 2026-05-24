import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext.jsx'
import './Navbar.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="navbar__btn navbar__btn--ghost navbar__btn--icon"
      type="button"
      onClick={toggleTheme}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

function AvatarBtn({ letter }) {
  const navigate = useNavigate()

  return (
    <button
      className="navbar__btn navbar__btn--avatar"
      type="button"
      onClick={() => navigate('/profile')}
    >
      {letter}
    </button>
  )
}

export default function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const loggedIn =
    token &&
    token !== 'undefined' &&
    token !== 'null' &&
    token.trim() !== ''

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth', { replace: true })
    window.location.reload()
  }

  const firstLetter = 'U'

  return (
    <nav className="navbar">
      <span
        className="navbar__logo"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(loggedIn ? '/dashboard' : '/')}
      >
        ExpenseTracker
      </span>

      <div className="navbar__actions">
        {loggedIn ? (
          <>
            <Link to="/transactions" className="navbar__btn navbar__btn--ghost">
              Transactions
            </Link>

            <Link to="/analytics" className="navbar__btn navbar__btn--ghost">
              Analytics
            </Link>

            <Link to="/add-transaction" className="navbar__btn navbar__btn--ghost">
              + Add
            </Link>

            <AvatarBtn letter={firstLetter} />

            <button
              className="navbar__btn navbar__btn--ghost"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="navbar__btn navbar__btn--ghost">
              Login
            </Link>

            <Link to="/auth" className="navbar__btn navbar__btn--primary">
              Sign Up
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  )
}