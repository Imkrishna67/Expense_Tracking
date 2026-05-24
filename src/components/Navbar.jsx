import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext.jsx'
import './Navbar.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button className="navbar__btn navbar__btn--ghost navbar__btn--icon" type="button" onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function AvatarBtn({ letter }) {
  const navigate = useNavigate()
  return (
    <button className="navbar__btn navbar__btn--avatar" type="button" onClick={() => navigate('/profile')} aria-label="Open profile">
      {letter}
    </button>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const loggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const firstLetter = 'U'

  return (
    <nav className="navbar">
      <span className="navbar__logo" style={{cursor:'pointer'}} onClick={() => navigate(loggedIn ? '/dashboard' : '/')}>ExpenseTracker</span>

      <div className="navbar__actions">
        {loggedIn ? (
          <>
            <Link to="/transactions" className="navbar__btn navbar__btn--ghost">Transactions</Link>
            <Link to="/analytics" className="navbar__btn navbar__btn--ghost">Analytics</Link>
            <Link to="/add-transaction" className="navbar__btn navbar__btn--ghost">+ Add</Link>
            <AvatarBtn letter={firstLetter} />
            <button className="navbar__btn navbar__btn--ghost" type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth" className="navbar__btn navbar__btn--ghost">Login</Link>
            <Link to="/auth" className="navbar__btn navbar__btn--primary">Sign Up</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  )
}