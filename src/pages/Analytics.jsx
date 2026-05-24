import StatsSummary from '../components/StatsSummary'
import MonthlyBarChart from '../components/MonthlyBarChart'
import CategoryPieChart from '../components/CategoryPieChart'
import './Analytics.css'

export default function Analytics() {
  return (
    <main className="analytics">
      <div className="analytics__inner">
        <h1 className="analytics__heading">Analytics</h1>

        {/* Top stats */}
        <StatsSummary />

        {/* Charts grid */}
        <div className="analytics__grid">
          <MonthlyBarChart />
          <CategoryPieChart />
        </div>
      </div>
    </main>
  )
}
