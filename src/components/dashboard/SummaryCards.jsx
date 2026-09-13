import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

export const SummaryCards = ({ income, expense, balance, budgetRemaining }) => {
  const cards = [
    {
      title: 'Net Balance',
      value: balance,
      icon: Wallet,
      bg: 'bg-primary',
      text: 'text-white'
    },
    {
      title: 'Income',
      value: income,
      icon: TrendingUp,
      bg: 'bg-success',
      text: 'text-white'
    },
    {
      title: 'Expenses',
      value: expense,
      icon: TrendingDown,
      bg: 'bg-danger',
      text: 'text-white'
    },
    {
      title: 'Budget Remaining',
      value: budgetRemaining,
      icon: Target,
      bg: 'bg-info',
      text: 'text-white'
    }
  ]

  return (
    <div className='row g-3 mb-4'>
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <div className='col-md-6 col-xl-3' key={i}>
            <div
              className={`card h-100 border-0 shadow-sm ${card.bg} ${card.text}`}
            >
              <div className='card-body d-flex justify-content-between align-items-center'>
                <div>
                  <div className='opacity-75 small text-uppercase fw-bold mb-1'>
                    {card.title}
                  </div>
                  <h3 className='mb-0 fw-bold'>{formatCurrency(card.value)}</h3>
                </div>
                <div
                  className='d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-25'
                  style={{ width: '50px', height: '50px' }}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
