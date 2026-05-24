export const monthlyData = [
  { month: 'Jan', income: 52000, expense: 38000 },
  { month: 'Feb', income: 48000, expense: 41000 },
  { month: 'Mar', income: 61000, expense: 45000 },
  { month: 'Apr', income: 53000, expense: 39000 },
  { month: 'May', income: 67000, expense: 52000 },
  { month: 'Jun', income: 72000, expense: 48000 },
]

export const categoryData = [
  { name: 'Food',      value: 12400, color: '#f97316' },
  { name: 'Rent',      value: 18000, color: '#8b5cf6' },
  { name: 'Transport', value: 5600,  color: '#3b82f6' },
  { name: 'Shopping',  value: 8200,  color: '#ec4899' },
  { name: 'Bills',     value: 4500,  color: '#14b8a6' },
  { name: 'Other',     value: 3200,  color: '#6b7280' },
]

export const expenses = [38000, 41000, 45000, 39000, 52000, 48000]
export const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0)
export const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0)

export function getTopStats() {
  const highestExpense = Math.max(...expenses)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const highestMonthIdx = expenses.indexOf(highestExpense)
  const highestMonth = months[highestMonthIdx]

  const totalSpent = totalExpense
  const days = 180
  const avgDaily = totalSpent / days

  const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100

  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0]

  return {
    highestExpense,
    highestMonth,
    topCategory,
    avgDaily,
    savingsRate,
  }
}
