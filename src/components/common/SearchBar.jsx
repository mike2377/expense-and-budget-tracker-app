import { Search, X } from 'lucide-react'
export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...'
}) => (
  <div className='input-group'>
    <span className='input-group-text bg-transparent'>
      <Search size={18} className='text-muted' />
    </span>
    <input
      type='text'
      className='form-control bg-transparent'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button
        className='btn btn-outline-secondary'
        type='button'
        onClick={() => onChange('')}
      >
        <X size={16} />
      </button>
    )}
  </div>
)
