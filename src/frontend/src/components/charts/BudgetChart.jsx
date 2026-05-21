import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
  { category: 'Food', spent: 450, limit: 600 },
  { category: 'Entertainment', spent: 180, limit: 200 },
  { category: 'Transport', spent: 120, limit: 300 },
  { category: 'Utilities', spent: 280, limit: 350 },
  { category: 'Shopping', spent: 520, limit: 500 },
  { category: 'Education', spent: 150, limit: 200 },
]

function BudgetChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis type="number" className="text-sm" />
        <YAxis dataKey="category" type="category" width={100} className="text-sm" />
        <Tooltip />
        <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[0, 4, 4, 0]} />
        <Bar dataKey="limit" fill="#e5e7eb" name="Limit" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BudgetChart
