import { PiggyBank } from 'lucide-react'
export const BudgetForm = () => (
  <div className='card p-3 mb-4 border-0 shadow-sm'>
    <div className='d-flex align-items-center gap-2 mb-2'>
      <PiggyBank size={20} className='text-primary' />
      <h5 className='mb-0'>Budget management</h5>
    </div>
    <p className='text-muted small mb-0'>
      Define monthly limits for each expense category. You will receive an alert when you approach or exceed your budget.
    </p>
  </div>
)
