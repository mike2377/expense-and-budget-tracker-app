export const generateSeedTransactions = () => {
  const today = new Date()
  return [
    {
      id: crypto.randomUUID(),
      type: 'income',
      amount: 500000,
      categoryId: 'c1',
      date: new Date(today.getFullYear(), today.getMonth(), 5)
        .toISOString()
        .split('T')[0],
      note: 'Mensual Salary',
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      type: 'expense',
      amount: 150000,
      categoryId: 'c5',
      date: new Date(today.getFullYear(), today.getMonth(), 3)
        .toISOString()
        .split('T')[0],
      note: 'Monthly Rent Apartment',
      createdAt: Date.now() - 1000
    },
    {
      id: crypto.randomUUID(),
      type: 'expense',
      amount: 25000,
      categoryId: 'c3',
      date: new Date(today.getFullYear(), today.getMonth(), 10)
        .toISOString()
        .split('T')[0],
      note: 'weekly shopping',
      createdAt: Date.now() - 2000
    },
    {
      id: crypto.randomUUID(),
      type: 'expense',
      amount: 15000,
      categoryId: 'c4',
      date: new Date(today.getFullYear(), today.getMonth(), 12)
        .toISOString()
        .split('T')[0],
      note: 'Gasoline',
      createdAt: Date.now() - 3000
    }
  ]
}
