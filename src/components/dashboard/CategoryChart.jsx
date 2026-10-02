import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'
import { EmptyState } from '../common/EmptyState'
import { PieChart as PieIcon } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

export const CategoryChart = ({ data }) => {
  if (!data || data.length === 0) { return <EmptyState message='No expenses this month' icon={PieIcon} /> }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
