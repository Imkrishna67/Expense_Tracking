import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import './AuthPage.css'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className="auth-page">
      <div className="auth-page__card">
        {/* Tab switch */}
        <div className="auth-page__tabs">
          <button
            className={`auth-page__tab ${isLogin ? 'auth-page__tab--active' : ''}`}
            type="button"
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`auth-page__tab ${!isLogin ? 'auth-page__tab--active' : ''}`}
            type="button"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <div
            className="auth-page__tab-indicator"
            style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>

        {/* Form */}
        <div className="auth-page__form-wrapper">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </main>
  )
}

