const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Salary', 'Entertainment', 'Other']

export default function FilterBar({ search, setSearch, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter }) {
  return (
    <div className="filter-bar">
      <input
        className="filter-bar__search"
        type="text"
        placeholder="Search transactions…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="filter-bar__select"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        className="filter-bar__select"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c.toLowerCase()}>{c === 'All' ? 'All Categories' : c}</option>
        ))}
      </select>
    </div>
  )
}
