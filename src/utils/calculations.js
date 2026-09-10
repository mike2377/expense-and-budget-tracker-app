export const calculateTotals = (transactions) => {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount
      else acc.expense += t.amount
      return acc
    },
    { income: 0, expense: 0 }
  )
}

export const calculateSpentByCategory = (transactions, categories) => {
  const data = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      data[t.categoryId] = (data[t.categoryId] || 0) + t.amount
    })
  return Object.entries(data)
    .map(([catId, amount]) => {
      const cat = categories.find((c) => c.id === catId) || {
        name: 'Unknown',
        color: '#ccc'
      }
      return { name: cat.name, value: amount, color: cat.color }
    })
    .sort((a, b) => b.value - a.value)
}

export const calculateTrendData = (transactions, months = 6) => {
  const data = []
  const now = new Date()

  for (let i = months - 1; i >= 0; i--) {
    // Create a date
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const targetYear = d.getFullYear()
    const targetMonth = d.getMonth()

    const label = d.toLocaleDateString('en-US', { month: 'short' })

    let monthIncome = 0
    let monthExpense = 0

    // Filter transactions by dates
    transactions.forEach((t) => {
      if (!t.date) return
      const tDate = new Date(t.date)
      const tYear = tDate.getFullYear()
      const tMonth = tDate.getMonth()

      if (tYear === targetYear && tMonth === targetMonth) {
        if (t.type === 'income') {
          monthIncome += t.amount
        } else {
          monthExpense += t.amount
        }
      }
    })

    data.push({
      month: label,
      income: monthIncome,
      expense: monthExpense
    })
  }

  return data
}
