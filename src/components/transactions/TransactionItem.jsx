import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { CategoryIcon } from '../common/CategoryIcon'

export const TransactionItem = ({ transaction, category, onEdit, onDelete }) => (
  <div className={`list-group-item d-flex justify-content-between align-items-center py-3 border-0 border-bottom transaction-item ${transaction.type}`}>
    <div className='d-flex align-items-center gap-3 flex-grow-1'>
      <div
        className='d-flex align-items-center justify-content-center rounded-circle flex-shrink-0'
        style={{
          width: '48px',
          height: '48px',
          background: `${category?.color || '#666'}20`
        }}
      >
        <CategoryIcon
          iconName={category?.icon}
          size={22}
          color={category?.color || '#666'}
        />
      </div>
      <div className='flex-grow-1 min-w-0'>
        <div className='d-flex align-items-center gap-2 flex-wrap'>
          {/* Category becomes the main title */}
          <span className='fw-bold text-truncate'>{category?.name || 'Uncategorized'}</span>
        </div>
        <div className='d-flex align-items-center gap-2 mt-1'>
          <small className='text-muted'>{formatDate(transaction.date)}</small>
          {transaction.note && (
            <>
              <span className='text-muted'>-</span>
              <small className='text-muted text-truncate'>{transaction.note}</small>
            </>
          )}
        </div>
      </div>
    </div>

    <div className='d-flex align-items-center gap-3 ms-3'>
      <span className={`h5 mb-0 fw-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </span>
      <div className='d-flex gap-1'>
        <button
          className='btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center'
          onClick={() => onEdit(transaction)}
          aria-label='Edit'
          style={{ width: '36px', height: '36px', padding: 0 }}
        >
          <Pencil size={14} />
        </button>
        <button
          className='btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center'
          onClick={() => onDelete(transaction.id)}
          aria-label='Delete'
          style={{ width: '36px', height: '36px', padding: 0 }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </div>
)
