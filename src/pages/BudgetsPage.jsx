import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import { BudgetCard } from '../components/budgets/BudgetCard'
import { MonthSelector } from '../components/dashboard/MonthSelector'
import { EmptyState } from '../components/common/EmptyState'
import { PiggyBank } from 'lucide-react'

export const BudgetsPage = () => {
  const { categories, selectedMonth, setSelectedMonth } = useTransactions()
  const { budgetStats, setBudget } = useBudgets()
  const expenseCategories = categories.filter((c) => c.type === 'expense')

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
        <div>
          <h2 className='mb-1 fw-bold d-flex align-items-center gap-2'>
            <PiggyBank size={28} className='text-primary' /> Monthly Budgets
          </h2>
          <p className='text-muted mb-0'>
            Define and track your spending limits
          </p>
        </div>
        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={setSelectedMonth}
        />
      </div>
      {expenseCategories.length === 0
        ? (
          <EmptyState
            message='No expense categories, Add some in the settings.'
            icon={PiggyBank}
          />
          )
        : (
          <div className='row g-3'>
            {budgetStats.map(({ category, spent, limit, percentage, isOver }) => (
              <div className='col-md-6 col-lg-4' key={category.id}>
                <BudgetCard
                  category={category}
                  spent={spent}
                  limit={limit}
                  percentage={percentage}
                  isOver={isOver}
                  onLimitChange={(amount) =>
                    setBudget(category.id, amount, selectedMonth)}
                />
              </div>
            ))}
          </div>
          )}
    </div>
  )
}
