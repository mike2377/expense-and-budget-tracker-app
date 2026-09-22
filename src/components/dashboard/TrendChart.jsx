import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { EmptyState } from '../common/EmptyState'
import { TrendingUp } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

export const TrendChart = ({ data }) => {
  // least one month with income or expenses > 0.
  const hasData = data && data.some((d) => d.income > 0 || d.expense > 0)

  if (!hasData) {
    return (
      <EmptyState
        message='No trend data available for the last 6 months, Add transactions !'
        icon={TrendingUp}
      />
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-body border rounded-3 shadow p-3'>
          <p className='mb-2 fw-bold'>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className='mb-1' style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='colorIncome' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#28c76a' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#28c76a' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#e74c3c' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#e74c3c' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' stroke='rgba(128,128,128,0.2)' />
        <XAxis dataKey='month' stroke='currentColor' />
        <YAxis stroke='currentColor' tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type='monotone'
          dataKey='income'
          stroke='#28c76a'
          strokeWidth={3}
          fillOpacity={1}
          fill='url(#colorIncome)'
          name='Income'
        />
        <Area
          type='monotone'
          dataKey='expense'
          stroke='#e74c3c'
          strokeWidth={3}
          fillOpacity={1}
          fill='url(#colorExpense)'
          name='Expenses'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
