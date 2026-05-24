import { useState } from 'react'
import API from '../api'

export default function TransactionList({ transactions, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const startEdit = (tx) => {
    setEditingId(tx._id)
    setEditData({ title: tx.title, amount: tx.amount, type: tx.type, category: tx.category, date: tx.date?.slice(0,10) })
  }

  const saveEdit = async (id) => {
    try {
      await API.put(`/transactions/${id}`, editData)
      setEditingId(null)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  if (transactions.length === 0) {
    return <p className="tx-list__empty">No transactions found.</p>
  }

  return (
    <ul className="tx-list">
      {transactions.map((tx) => (
        <li className="tx-item" key={tx._id}>
          {editingId === tx._id ? (
            <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
              <input
                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
              />
              <input
                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff', width: '100px' }}
                type="number"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                placeholder="Amount"
              />
              <select
                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <button onClick={() => saveEdit(tx._id)} style={{ padding: '4px 12px', borderRadius: '6px', background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer' }}>Save</button>
              <button onClick={() => setEditingId(null)} style={{ padding: '4px 12px', borderRadius: '6px', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          ) : (
            <>
              <div className="tx-item__info">
                <span className="tx-item__name">{tx.title}</span>
                <span className="tx-item__meta">{tx.category} · {tx.date?.slice(0,10)}</span>
              </div>
              <span className={`tx-item__amount ${tx.type === 'income' ? 'tx-item__amount--in' : 'tx-item__amount--out'}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount?.toLocaleString('en-IN')}
              </span>
              <div className="tx-item__actions">
                <button className="tx-item__action" type="button" aria-label="Edit" onClick={() => startEdit(tx)}>✏️</button>
                <button className="tx-item__action" type="button" aria-label="Delete" onClick={() => onDelete(tx._id)}>🗑️</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}