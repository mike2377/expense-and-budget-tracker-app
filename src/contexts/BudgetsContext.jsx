import { createContext, useMemo, useCallback } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/constants'

// oxlint-disable-next-line react/only-export-components
export const BudgetsContext = createContext()

export const BudgetsProvider = ({ children }) => {
  const { categories, monthFilteredTransactions, selectedMonth } = useTransactions()
  const [budgets, setBudgets] = useLocalStorage(STORAGE_KEYS.BUDGETS, [])

  const setBudget = useCallback((categoryId, amount, month) => {
    setBudgets((prev) => {
      const filtered = prev.filter((b) => !(b.categoryId === categoryId && b.month === month))
      if (amount > 0) {
        return [...filtered, { id: crypto.randomUUID(), categoryId, amount, month }]
      }
      return filtered
    })
  }, [setBudgets])

  const budgetStats = useMemo(() => {
    return categories.filter((c) => c.type === 'expense').map((cat) => {
      const spent = monthFilteredTransactions
        .filter((t) => t.categoryId === cat.id && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0)

      const budgetObj = budgets.find((b) => b.categoryId === cat.id && b.month === selectedMonth)
      const limit = budgetObj ? budgetObj.amount : 0
      const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0

      return {
        category: cat,
        spent,
        limit,
        percentage,
        isOver: spent > limit && limit > 0
      }
    })
  }, [categories, monthFilteredTransactions, budgets, selectedMonth])

  return (
    <BudgetsContext.Provider value={{ budgets, setBudget, budgetStats }}>
      {children}
    </BudgetsContext.Provider>
  )
}
