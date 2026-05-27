import { useState, useEffect } from 'react'
import PageHeader from '../../components/shared/PageHeader'
import StatsCard from '../../components/shared/StatsCard'
import SectionTitle from '../../components/shared/SectionTitle'
import ExpensesChart from '../../components/charts/ExpensesChart'
import IncomeExpenseChart from '../../components/charts/IncomeExpenseChart'
import BudgetChart from '../../components/charts/BudgetChart'
import SavingsChart from '../../components/charts/SavingsChart'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import EmptyState from '../../components/shared/EmptyState'
import { reportService } from '../../services/reportService'

function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [monthlyData, setMonthlyData] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadReports()
  }, [selectedMonth, selectedYear])

  const loadReports = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [monthlyResponse, categoryResponse] = await Promise.all([
        reportService.getMonthlyReport(selectedMonth, selectedYear),
        reportService.getCategoryReport('EXPENSE')
      ])

      if (monthlyResponse.success) {
        setMonthlyData(monthlyResponse.data)
      }
      if (categoryResponse.success) {
        setCategoryData(categoryResponse.data || [])
      }
    } catch (err) {
      setError('Failed to load reports')
      console.error('Error loading reports:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading reports"
        description={error}
        action={
          <button onClick={loadReports}>Try Again</button>
        }
      />
    )
  }

  const totalIncome = monthlyData?.totalIncome || 0
  const totalExpenses = monthlyData?.totalExpenses || 0
  const balance = monthlyData?.balance || 0
  const savingsRate = monthlyData?.savingsRate || 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Detailed financial insights and trends"
      />

      {/* Month/Year Selector */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          change="This month"
          changeType="positive"
        />
        <StatsCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          change="This month"
          changeType="negative"
        />
        <StatsCard
          title="Net Balance"
          value={`$${balance.toLocaleString()}`}
          change="This month"
          changeType={balance >= 0 ? 'positive' : 'negative'}
        />
        <StatsCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          change="This month"
          changeType="positive"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <SectionTitle title="Income vs Expenses" description="Monthly comparison" />
          <IncomeExpenseChart />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <SectionTitle title="Expenses by Category" description="Distribution breakdown" />
          <ExpensesChart />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <SectionTitle title="Budget vs Actual" description="Spending vs limits" />
          <BudgetChart />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <SectionTitle title="Savings Growth" description="Total savings over time" />
          <SavingsChart />
        </div>
      </div>

      {/* Category Analysis Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <SectionTitle title="Category Analysis" description="Detailed breakdown by category" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Average
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categoryData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No category data available
                  </td>
                </tr>
              ) : (
                categoryData.map((category, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{category.categoryName || 'N/A'}</td>
                    <td className="px-6 py-4 text-right">${(category.totalAmount || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">{category.transactionCount || 0}</td>
                    <td className="px-6 py-4 text-right">${(category.averageAmount || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">{(category.percentage || 0).toFixed(1)}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
