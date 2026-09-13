import { Calendar } from 'lucide-react'

export const MonthSelector = ({ selectedMonth, onChange }) => (
  <div className='input-group' style={{ maxWidth: '220px' }}>
    <span className='input-group-text bg-transparent'>
      <Calendar size={18} className='text-muted' />
    </span>
    <input
      type='month'
      className='form-control'
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      aria-label='Select a month'
    />
  </div>
)
