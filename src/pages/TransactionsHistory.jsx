import { useState, useEffect, useMemo } from 'react'
import FilterBar from '../components/FilterBar'
import TransactionList from '../components/TransactionList'
import API from '../api'
import './TransactionsHistory.css'

export default function TransactionsHistory() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    API.get('/transactions')
      .then(res => setTransactions(Array.isArray(res.data) ? res.data : res.data.transactions || []))
      .catch(err => console.log(err))
  }, [])

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = tx.title?.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === 'all' || tx.type === typeFilter
      const matchCat = categoryFilter === 'all' || tx.category?.toLowerCase() === categoryFilter
      return matchSearch && matchType && matchCat
    })
  }, [transactions, search, typeFilter, categoryFilter])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`)
      setTransactions(prev => prev.filter(tx => tx._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="tx-history">
      <div className="tx-history__inner">
        <h1 className="tx-history__heading">Transactions</h1>
        <FilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <TransactionList transactions={filtered} onDelete={handleDelete} />
      </div>
    </main>
  )
}