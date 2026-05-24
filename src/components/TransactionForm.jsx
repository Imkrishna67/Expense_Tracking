import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Salary', 'Entertainment', 'Other']

export default function TransactionForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await API.post('/transactions', { title, amount: Number(amount), type, category, date, note })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="tx-form" onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      <div className="tx-form__row">
        <div className="tx-form__field">
          <label className="tx-form__label" htmlFor="tx-title">Title</label>
          <input id="tx-title" className="tx-form__input" type="text" placeholder="e.g. Lunch at Cafe" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="tx-form__field tx-form__field--sm">
          <label className="tx-form__label" htmlFor="tx-amount">Amount</label>
          <input id="tx-amount" className="tx-form__input" type="number" placeholder="0" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
      </div>

      <div className="tx-form__row">
        <div className="tx-form__field">
          <label className="tx-form__label">Type</label>
          <div className="tx-form__toggle">
            <button
              type="button"
              style={{
                padding: '8px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                background: type === 'income' ? '#22c55e' : '#333',
                color: type === 'income' ? '#fff' : '#aaa',
              }}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              style={{
                padding: '8px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                marginLeft: '8px',
                background: type === 'expense' ? '#ef4444' : '#333',
                color: type === 'expense' ? '#fff' : '#aaa',
              }}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
        </div>
        <div className="tx-form__field tx-form__field--sm">
          <label className="tx-form__label" htmlFor="tx-category">Category</label>
          <select id="tx-category" className="tx-form__input tx-form__select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tx-form__row">
        <div className="tx-form__field">
          <label className="tx-form__label" htmlFor="tx-date">Date</label>
          <input id="tx-date" className="tx-form__input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="tx-form__field tx-form__field--sm">
          <label className="tx-form__label" htmlFor="tx-note">Note <span className="tx-form__optional">(optional)</span></label>
          <textarea id="tx-note" className="tx-form__input tx-form__textarea" placeholder="Add a note…" rows="1" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>

      <button className="tx-form__submit" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  )
}