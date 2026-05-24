import { useNavigate } from 'react-router-dom'
import SummaryCards from '../components/SummaryCards'
import SpendingChart from '../components/SpendingChart'
import RecentTransactions from '../components/RecentTransactions'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="dashboard">
      <div className="dashboard__inner">
        <div className="dashboard__top">
          <h1 className="dashboard__heading">Dashboard</h1>
          <button className="dashboard__add-btn" type="button" onClick={() => navigate('/add-transaction')}>
            + Add Transaction
          </button>
        </div>

        {/* Top summary cards */}
        <SummaryCards />

        {/* Chart + Transactions grid */}
        <div className="dashboard__grid">
          <SpendingChart />
          <RecentTransactions />
        </div>
      </div>
    </main>
  )
}
