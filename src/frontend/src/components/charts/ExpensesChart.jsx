import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const mockData = [
  { name: 'Food & Dining', value: 450, color: '#3b82f6' },
  { name: 'Entertainment', value: 180, color: '#8b5cf6' },
  { name: 'Transportation', value: 120, color: '#f59e0b' },
  { name: 'Utilities', value: 280, color: '#ef4444' },
  { name: 'Shopping', value: 520, color: '#ec4899' },
  { name: 'Education', value: 150, color: '#10b981' },
]

function ExpensesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ExpensesChart
