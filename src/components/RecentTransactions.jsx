import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    API.get('/transactions?limit=5')
      .then(res => setTransactions(res.data.transactions || res.data || []))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="recent-transactions">
      <div className="recent-transactions__header">
        <h3 className="recent-transactions__title">Recent Transactions</h3>
        <Link to="/transactions" className="recent-transactions__view-all">View All</Link>
      </div>
      <ul className="recent-transactions__list">
        {transactions.length === 0 && <p style={{color:'var(--text)', padding:'1rem'}}>No transactions yet</p>}
        {transactions.map((tx) => (
          <li className="tx-row" key={tx._id}>
            <div className="tx-row__info">
              <span className="tx-row__name">{tx.title}</span>
              <span className="tx-row__meta">{tx.category} · {tx.date?.slice(0,10)}</span>
            </div>
            <span className={`tx-row__amount ${tx.type === 'income' ? 'tx-row__amount--in' : 'tx-row__amount--out'}`}>
              {tx.type === 'income' ? '+' : '-'}₹{tx.amount?.toLocaleString('en-IN')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}