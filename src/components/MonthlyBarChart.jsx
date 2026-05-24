import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import API from '../api'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="chart-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyBarChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    API.get('/analytics/monthly')
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="monthly-bar-chart">
      <div className="monthly-bar-chart__header">
        <h3 className="monthly-bar-chart__title">Monthly Overview</h3>
        <span className="monthly-bar-chart__subtitle">Income vs Expense</span>
      </div>
      <div className="monthly-bar-chart__body">
        {data.length === 0 ? <p style={{color:'var(--text)', padding:'1rem'}}>No data yet</p> : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barCategoryGap="20%">
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: 'var(--text)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(170, 59, 255, 0.06)' }} />
              <Bar dataKey="income" name="Income" radius={[6, 6, 0, 0]} fill="#22c55e" />
              <Bar dataKey="expense" name="Expense" radius={[6, 6, 0, 0]} fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="monthly-bar-chart__legend">
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--in" /> Income</span>
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--out" /> Expense</span>
      </div>
    </div>
  )
}