import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const mockData = [
  { month: 'Jan', savings: 3650 },
  { month: 'Feb', savings: 4050 },
  { month: 'Mar', savings: 4300 },
  { month: 'Apr', savings: 4800 },
  { month: 'May', savings: 5150 },
  { month: 'Jun', savings: 5600 },
]

function SavingsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 4 }}
          activeDot={{ r: 6 }}
          name="Total Savings"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SavingsChart
