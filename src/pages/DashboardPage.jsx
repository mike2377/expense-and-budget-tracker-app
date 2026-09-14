import { useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import {
  calculateTotals,
  calculateSpentByCategory,
  calculateTrendData
} from '../utils/calculations'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { CategoryChart } from '../components/dashboard/CategoryChart'
import { TrendChart } from '../components/dashboard/TrendChart'
import { MonthSelector } from '../components/dashboard/MonthSelector'
import { TransactionItem } from '../components/transactions/TransactionItem'
import { EmptyState } from '../components/common/EmptyState'
import { Link } from 'react-router-dom'
import { ArrowRight, PieChart as PieIcon, TrendingUp } from 'lucide-react'

export const DashboardPage = () => {
  const {
    monthFilteredTransactions,
    categories,
    selectedMonth,
    setSelectedMonth,
    transactions
  } = useTransactions()
  const { budgetStats } = useBudgets()

  const { income, expense } = useMemo(
    () => calculateTotals(monthFilteredTransactions),
    [monthFilteredTransactions]
  )
  const balance = income - expense
  const budgetRemaining = useMemo(() => {
    const totalBudget = budgetStats.reduce((acc, b) => acc + b.limit, 0)
    const totalSpent = budgetStats.reduce((acc, b) => acc + b.spent, 0)
    return totalBudget - totalSpent
  }, [budgetStats])

  const categoryData = useMemo(
    () => calculateSpentByCategory(monthFilteredTransactions, categories),
    [monthFilteredTransactions, categories]
  )
  const trendData = useMemo(
    () => calculateTrendData(transactions, 6),
    [transactions]
  )
  const recentTransactions = monthFilteredTransactions.slice(0, 5)

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
        <div>
          <h2 className='mb-1 fw-bold'>Dashboard</h2>
          <p className='text-muted mb-0'>Overview of your finances</p>
        </div>
        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={setSelectedMonth}
        />
      </div>
      <SummaryCards
        income={income}
        expense={expense}
        balance={balance}
        budgetRemaining={budgetRemaining}
      />
      <div className='row g-3 mb-4'>
        <div className='col-lg-6'>
          <div className='card p-4 h-100 border-0 shadow-sm'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div>
                <h5 className='mb-1 fw-bold d-flex align-items-center gap-2'>
                  <PieIcon size={20} className='text-primary' /> Expenses by category
                </h5>
                <p className='text-muted small mb-0'>
                  Distribution of your expenses
                </p>
              </div>
            </div>
            <CategoryChart data={categoryData} />
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='card p-4 h-100 border-0 shadow-sm'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div>
                <h5 className='mb-1 fw-bold d-flex align-items-center gap-2'>
                  <TrendingUp size={20} className='text-success' /> Trend over 6 months
                </h5>
                <p className='text-muted small mb-0'>Incomes vs Expenses</p>
              </div>
            </div>
            <TrendChart data={trendData} />
          </div>
        </div>
      </div>
      <div className='card border-0 shadow-sm'>
        <div className='card-header d-flex justify-content-between align-items-center bg-transparent border-0 pt-3'>
          <h5 className='mb-0 fw-bold'>Recent Transactions</h5>
          <Link to='/transactions' className='btn btn-sm btn-outline-primary'>
            View all <ArrowRight size={16} className='ms-1' />
          </Link>
        </div>
        <div className='list-group list-group-flush'>
          {recentTransactions.length === 0
            ? (
              <EmptyState message='No transactions this month' />
              )
            : (
                recentTransactions.map((t) => {
                  const cat = categories.find((c) => c.id === t.categoryId)
                  return (
                    <TransactionItem
                      key={t.id}
                      transaction={t}
                      category={cat}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  )
                })
              )}
        </div>
      </div>
    </div>
  )
}
