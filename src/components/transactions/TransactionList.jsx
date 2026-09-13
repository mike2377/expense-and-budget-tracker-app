import { useTransactions } from '../../hooks/useTransactions'
import { TransactionItem } from './TransactionItem'
import { EmptyState } from '../common/EmptyState'
import { Receipt } from 'lucide-react'

export const TransactionList = ({ transactions, onEdit }) => {
  const { categories, deleteTransaction } = useTransactions()
  if (transactions.length === 0) {
    return (
      <EmptyState
        message='No transactions match your criteria.'
        icon={Receipt}
      />
    )
  }

  return (
    <div className='card border-0 shadow-sm'>
      <div className='list-group list-group-flush'>
        {transactions.map((t) => {
          const cat = categories.find((c) => c.id === t.categoryId)
          return (
            <TransactionItem
              key={t.id}
              transaction={t}
              category={cat}
              onEdit={onEdit}
              onDelete={deleteTransaction}
            />
          )
        })}
      </div>
    </div>
  )
}
