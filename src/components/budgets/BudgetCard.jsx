import { AlertTriangle } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { BudgetProgress } from './BudgetProgress'
import { CategoryIcon } from '../common/CategoryIcon'

export const BudgetCard = ({
  category,
  spent,
  limit,
  percentage,
  isOver,
  onLimitChange
}) => (
  <div className='card p-3 h-100 border-0 shadow-sm'>
    <div className='d-flex justify-content-between align-items-center mb-3'>
      <div className='d-flex align-items-center gap-2'>
        <div
          className='rounded-circle d-flex align-items-center justify-content-center'
          style={{
            width: '40px',
            height: '40px',
            background: `${category.color}20`
          }}
        >
          {isOver
            ? (
              <AlertTriangle size={20} className='text-danger' />
              )
            : (
              <CategoryIcon
                iconName={category.icon}
                size={20}
                color={category.color}
              />
              )}
        </div>
        <h6 className='mb-0 fw-bold' style={{ color: category.color }}>
          {category.name}
        </h6>
      </div>
      {isOver && <span className='badge bg-danger'>Exceed</span>}
    </div>

    <div className='mb-3'>
      <label className='form-label small text-muted mb-1'>
        Monthly Limit
      </label>
      <input
        type='number'
        className='form-control form-control-sm'
        value={limit || ''}
        onChange={(e) => onLimitChange(parseFloat(e.target.value) || 0)}
        placeholder='Eg: 50000'
      />
    </div>

    <BudgetProgress percentage={percentage} isOver={isOver} />

    <div className='d-flex justify-content-between small mt-2'>
      <span className='text-muted'>
        Spent: <strong>{formatCurrency(spent)}</strong>
      </span>
      <span className='text-muted'>
        Limit: <strong>{formatCurrency(limit)}</strong>
      </span>
    </div>

    {isOver && (
      <div className='alert alert-danger mt-2 p-2 small mb-0 border-0 d-flex align-items-center gap-2'>
        <AlertTriangle size={16} />
        Exceeding by {formatCurrency(spent - limit)}
      </div>
    )}
  </div>
)
