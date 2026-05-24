import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import API from '../api'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      <p className="chart-tooltip__value">
        {payload[0].value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
      </p>
    </div>
  )
}

export default function SpendingChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    API.get('/analytics/monthly')
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err))
  }, [])

  const max = data.length > 0 ? Math.max(...data.map((d) => d.amount || 0)) : 0

  return (
    <div className="spending-chart">
      <div className="spending-chart__header">
        <h3 className="spending-chart__title">Monthly Spending</h3>
      </div>
      <div className="spending-chart__body">
        {data.length === 0 ? (
          <p style={{color:'var(--text)', padding:'1rem'}}>No data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} barCategoryGap="20%">
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: 'var(--text)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(170, 59, 255, 0.06)' }} />
              <Bar dataKey="expense" radius={[6, 6, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.amount >= max * 0.7 ? 'var(--accent)' : 'rgba(170, 59, 255, 0.35)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}