import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function SignupForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/signup', { name, email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Create account</h2>
      <p className="auth-form__subtitle">
        Already have an account?{' '}
        <Link to="/auth" className="auth-form__link">Log in</Link>
      </p>

      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      <div className="auth-form__field">
        <label htmlFor="signup-name" className="auth-form__label">Full Name</label>
        <input
          id="signup-name"
          type="text"
          className="auth-form__input"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="auth-form__field">
        <label htmlFor="signup-email" className="auth-form__label">Email</label>
        <input
          id="signup-email"
          type="email"
          className="auth-form__input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="auth-form__field">
        <label htmlFor="signup-password" className="auth-form__label">Password</label>
        <input
          id="signup-password"
          type="password"
          className="auth-form__input"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="auth-form__submit" type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}