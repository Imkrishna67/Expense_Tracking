import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import API from '../api'

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899', '#14b8a6']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{entry.name}</p>
      <p className="chart-tooltip__value">
        {entry.value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
      </p>
    </div>
  )
}

const RADIAN = Math.PI / 180
function renderLabel({ cx, cy, midAngle, outerRadius, name, percent }) {
  const radius = outerRadius + 28
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="var(--text)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {name} {(percent * 100).toFixed(0)}%
    </text>
  )
}

export default function CategoryPieChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    API.get('/analytics/category')
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="category-pie-chart">
      <div className="category-pie-chart__header">
        <h3 className="category-pie-chart__title">Spending by Category</h3>
      </div>
      <div className="category-pie-chart__body">
        {data.length === 0 ? <p style={{color:'var(--text)', padding:'1rem'}}>No data yet</p> : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={44} paddingAngle={3} stroke="none" label={renderLabel}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}