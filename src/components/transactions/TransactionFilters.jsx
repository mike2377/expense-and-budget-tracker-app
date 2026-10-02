import { Search, Filter, Tag, TrendingUp, TrendingDown } from 'lucide-react'
import { useTransactions } from '../../hooks/useTransactions'
import { SearchBar } from '../common/SearchBar'

export const TransactionFilters = ({ searchQuery, setSearchQuery, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter }) => {
  const { categories } = useTransactions()

  return (
    <div className='card p-3 mb-4 border-0 shadow-sm'>
      <div className='row g-3'>
        <div className='col-md-6'>
          <label className='form-label small text-muted mb-1 d-flex align-items-center gap-1'>
            <Search size={14} /> Search
          </label>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search within the notes...' />
        </div>
        <div className='col-md-3'>
          <label className='form-label small text-muted mb-1 d-flex align-items-center gap-1'>
            <Filter size={14} /> Type
          </label>
          <select className='form-select' value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value='all'>All</option>
            <option value='income'>
              <TrendingUp size={14} /> Incomes
            </option>
            <option value='expense'>
              <TrendingDown size={14} /> Expenses
            </option>
          </select>
        </div>
        <div className='col-md-3'>
          <label className='form-label small text-muted mb-1 d-flex align-items-center gap-1'>
            <Tag size={14} /> Category
          </label>
          <select className='form-select' value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value='all'>All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
