import { useEffect, useState } from 'react'
import { reportService } from '../../services/reportService'

function ReportsPage() {
  const [monthlyReport, setMonthlyReport] = useState(null)
  const [categoryReport, setCategoryReport] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    loadReports()
  }, [selectedMonth, selectedYear])

  const loadReports = async () => {
    try {
      setLoading(true)
      const [monthlyRes, categoryRes] = await Promise.all([
        reportService.getMonthlyReport(selectedMonth, selectedYear),
        reportService.getCategoryReport('EXPENSE'),
      ])

      setMonthlyReport(monthlyRes.data)
      setCategoryReport(categoryRes.data || [])
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center">Loading reports...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      {/* Month/Year Selector */}
      <div className="flex gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2 bg-background border border-input rounded-lg"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 bg-background border border-input rounded-lg"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {monthlyReport && (
        <>
          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Income</h3>
              <p className="text-3xl font-bold text-green-500">${monthlyReport.totalIncome}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</h3>
              <p className="text-3xl font-bold text-red-500">${monthlyReport.totalExpenses}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Balance</h3>
              <p className="text-3xl font-bold">${monthlyReport.balance}</p>
            </div>
          </div>

          {/* Expenses by Category */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
            <div className="space-y-3">
              {Object.entries(monthlyReport.expensesByCategory || {}).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="font-medium">{category}</span>
                  <span className="font-bold">${amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Income by Category */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Income by Category</h2>
            <div className="space-y-3">
              {Object.entries(monthlyReport.incomeByCategory || {}).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="font-medium">{category}</span>
                  <span className="font-bold">${amount}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Category Report */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Category Analysis</h2>
        {categoryReport.length === 0 ? (
          <p className="text-muted-foreground">No category data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Category</th>
                  <th className="text-right p-3">Total Amount</th>
                  <th className="text-right p-3">Transactions</th>
                  <th className="text-right p-3">Average</th>
                </tr>
              </thead>
              <tbody>
                {categoryReport.map((cat) => (
                  <tr key={cat.categoryName} className="border-b border-border">
                    <td className="p-3 font-medium">{cat.categoryName}</td>
                    <td className="p-3 text-right">${cat.totalAmount}</td>
                    <td className="p-3 text-right">{cat.transactionCount}</td>
                    <td className="p-3 text-right">${cat.averageAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportsPage
