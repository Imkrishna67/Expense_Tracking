const Transaction = require('../models/Transaction');

const getMonthlyData = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const monthlyData = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expense += t.amount;
      }
    });

    const result = Object.values(monthlyData);
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCategoryData = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
      type: 'expense'
    });

    const categoryData = {};

    transactions.forEach((t) => {
      if (!categoryData[t.category]) {
        categoryData[t.category] = { name: t.category, value: 0 };
      }
      categoryData[t.category].value += t.amount;
    });

    const result = Object.values(categoryData);
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getStatsSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const savingsRate = totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : 0;

    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const avgDailySpend = expenseTransactions.length > 0
      ? (totalExpense / expenseTransactions.length).toFixed(1)
      : 0;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      savingsRate,
      avgDailySpend
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMonthlyData, getCategoryData, getStatsSummary };