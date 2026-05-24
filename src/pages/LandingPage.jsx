import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/dashboard')
  }, [])

  return (
    <main className="landing">
      <Navbar />

      <section className="hero">
        <h1 className="hero__heading">
          Track every rupee spent,<br />make every rupee count.
        </h1>
        <p className="hero__desc">
          The simplest way to manage your daily expenses and build better financial habits.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button" onClick={() => navigate('/auth')}>Get Started Free</button>
          <button className="btn btn--ghost" type="button">Learn More</button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Everything you need to stay in control</h2>
        <div className="features__grid">
          <div className="card">
            <div className="card__icon">📊</div>
            <h3>Charts</h3>
            <p>Visual insights into where your money goes every month.</p>
          </div>
          <div className="card">
            <div className="card__icon">🎯</div>
            <h3>Track</h3>
            <p>Log expenses in seconds with categories, tags and notes.</p>
          </div>
          <div className="card">
            <div className="card__icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data stays private. All sensitive info is encrypted.</p>
          </div>
        </div>
      </section>

      <section className="steps">
        <h2 className="section-title">Three simple steps</h2>
        <div className="steps__grid">
          <div className="step">
            <span className="step__num">1</span>
            <h3>Sign Up</h3>
            <p>Create your free account in under a minute.</p>
          </div>
          <div className="step">
            <span className="step__num">2</span>
            <h3>Add Expenses</h3>
            <p>Record transactions with categories and amounts.</p>
          </div>
          <div className="step">
            <span className="step__num">3</span>
            <h3>View Reports</h3>
            <p>See trends, summaries and actionable insights.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer__copy">© 2026 ExpenseTracker. All rights reserved.</p>
        <div className="footer__links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </footer>
    </main>
  )
}