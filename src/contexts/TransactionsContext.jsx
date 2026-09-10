import { createContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_CATEGORIES } from '../data/categories'
import { STORAGE_KEYS } from '../utils/constants'
import { getCurrentMonth } from '../utils/formatDate'

// oxlint-disable-next-line react/only-export-components
export const TransactionsContext = createContext()

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.TRANSACTIONS, [])
  const [categories, setCategories] = useLocalStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
  const [selectedMonth, setSelectedMonth] = useLocalStorage(STORAGE_KEYS.MONTH, getCurrentMonth())

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, createdAt: Date.now() }, ...prev])
  }, [setTransactions])

  const updateTransaction = useCallback((id, updatedTx) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTx } : t)))
  }, [setTransactions])

  const deleteTransaction = useCallback((id) => {
    if (window.confirm('Confirm delete this transaction ?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    }
  }, [setTransactions])

  const addCategory = useCallback((cat) => {
    setCategories((prev) => [...prev, { ...cat, id: crypto.randomUUID() }])
  }, [setCategories])

  const deleteCategory = useCallback((id) => {
    if (window.confirm('Delete category ?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
    }
  }, [setCategories])

  const monthFilteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.date.startsWith(selectedMonth))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [transactions, selectedMonth])

  const value = useMemo(() => ({
    transactions,
    categories,
    selectedMonth,
    monthFilteredTransactions,
    setSelectedMonth,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    deleteCategory,
    setTransactions
  }), [
    transactions,
    categories,
    selectedMonth,
    monthFilteredTransactions,
    setSelectedMonth,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    deleteCategory,
    setTransactions
  ])

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}
