import { useState, useEffect } from 'react'
import API from '../api'

function StatCard({ label, value, sub, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__icon" style={{ background: color + '18', color }}>{icon}</span>
        <span className="stat-card__label">{label}</span>
      </div>
      <p className="stat-card__value">{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  )
}

export default function StatsSummary() {
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, balance: 0, savingsRate: 0 })

  useEffect(() => {
    API.get('/analytics/summary')
      .then(res => setStats(res.data))
      .catch(err => console.log(err))
  }, [])

  const avgDaily = stats.totalExpense ? (stats.totalExpense / 30).toFixed(0) : 0

  return (
    <div className="stats-summary">
      <StatCard
        label="Total Income"
        value={Number(stats.totalIncome).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
        icon="💰"
        color="#22c55e"
      />
      <StatCard
        label="Total Expense"
        value={Number(stats.totalExpense).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
        icon="🔥"
        color="#ef4444"
      />
      <StatCard
        label="Avg Daily Spend"
        value={Number(avgDaily).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
        sub="This period"
        icon="📅"
        color="#3b82f6"
      />
      <StatCard
        label="Savings Rate"
        value={`${Number(stats.savingsRate || 0).toFixed(1)}%`}
        sub="of total income"
        icon={stats.savingsRate >= 0 ? '💚' : '💔'}
        color={stats.savingsRate >= 0 ? '#22c55e' : '#ef4444'}
      />
    </div>
  )
}