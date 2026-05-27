import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const mockData = [
  { month: 'Jan', income: 5350, expenses: 1700 },
  { month: 'Feb', income: 5350, expenses: 1950 },
  { month: 'Mar', income: 5350, expenses: 2100 },
  { month: 'Apr', income: 5350, expenses: 1850 },
  { month: 'May', income: 5350, expenses: 2200 },
  { month: 'Jun', income: 5350, expenses: 1900 },
]

function IncomeExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IncomeExpenseChart
