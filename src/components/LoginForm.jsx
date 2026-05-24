import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Welcome back</h2>
      <p className="auth-form__subtitle">
        Don't have an account?{' '}
        <Link to="/auth" className="auth-form__link">Sign up</Link>
      </p>

      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      <div className="auth-form__field">
        <label htmlFor="login-email" className="auth-form__label">Email</label>
        <input
          id="login-email"
          type="email"
          className="auth-form__input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="auth-form__field">
        <label htmlFor="login-password" className="auth-form__label">Password</label>
        <input
          id="login-password"
          type="password"
          className="auth-form__input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="auth-form__submit" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}