import { useState, useEffect } from 'react'
import API from '../api'

export default function SummaryCards() {
  const [data, setData] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 })

  useEffect(() => {
    API.get('/analytics/summary')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const cards = [
    {
      id: 1, title: 'Total Income',
      value: `₹${data.totalIncome?.toLocaleString('en-IN')}`,
      iconBg: 'rgba(34, 197, 94, 0.12)', iconColor: '#22c55e', icon: '↑'
    },
    {
      id: 2, title: 'Total Expense',
      value: `₹${data.totalExpense?.toLocaleString('en-IN')}`,
      iconBg: 'rgba(239, 68, 68, 0.12)', iconColor: '#ef4444', icon: '↓'
    },
    {
      id: 3, title: 'Current Balance',
      value: `₹${data.balance?.toLocaleString('en-IN')}`,
      iconBg: 'rgba(59, 130, 246, 0.12)', iconColor: '#3b82f6', icon: '₿'
    },
  ]

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.id}>
          <div className="summary-card__top">
            <span className="summary-card__icon" style={{ background: card.iconBg, color: card.iconColor }}>
              {card.icon}
            </span>
          </div>
          <p className="summary-card__title">{card.title}</p>
          <p className="summary-card__value">{card.value}</p>
        </div>
      ))}
    </div>
  )
}