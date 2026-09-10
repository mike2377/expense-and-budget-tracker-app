import { useState, useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { FILTERS } from '../utils/constants'

export const useFilters = (transactions) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState(FILTERS.ALL)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const debouncedSearch = useDebounce(searchQuery, 300)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = typeFilter === FILTERS.ALL || t.type === typeFilter
      const matchCategory = categoryFilter === 'all' || t.categoryId === categoryFilter
      // note search
      const matchSearch = !debouncedSearch || 
        (t.note && t.note.toLowerCase().includes(debouncedSearch.toLowerCase()))
      return matchType && matchCategory && matchSearch
    })
  }, [transactions, typeFilter, categoryFilter, debouncedSearch])

  return { searchQuery, setSearchQuery, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter, filteredTransactions }
}