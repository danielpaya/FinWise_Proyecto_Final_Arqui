import FinancialCard from '../../components/dashboard/FinancialCard'
import RecentTransactions from '../../components/dashboard/RecentTransactions'
import SavingsGoals from '../../components/dashboard/SavingsGoals'
import { BarChart3, TrendingUp, Wallet, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { reportService } from '../../services/reportService'
import { transactionService } from '../../services/transactionService'
import { goalService } from '../../services/goalService'

function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState('this-month')
  const [monthlyReport, setMonthlyReport] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError('')

        const month = 5
        const year = 2026

        const monthlyResponse = await reportService.getMonthlyReport(month, year)
        const transactionsResponse = await transactionService.getAllTransactions()
        const goalsResponse = await goalService.getAllGoals()

        setMonthlyReport(monthlyResponse.data)
        setTransactions(transactionsResponse.data || [])
        setGoals(goalsResponse.data || [])
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError('Could not load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const financialData = {
    balance: monthlyReport?.balance || 0,
    income: monthlyReport?.totalIncome || 0,
    expenses: monthlyReport?.totalExpenses || 0,
    savings: goals.reduce((sum, goal) => sum + Number(goal.currentAmount || 0), 0),
  }

  const monthlyChanges = {
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading dashboard...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your financial health</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialCard
          type="balance"
          amount={financialData.balance}
          change={monthlyChanges.balance}
          changePositive
        />
        <FinancialCard
          type="income"
          amount={financialData.income}
          change={monthlyChanges.income}
          changePositive
        />
        <FinancialCard
          type="expenses"
          amount={financialData.expenses}
          change={monthlyChanges.expenses}
          changePositive={false}
        />
        <FinancialCard
          type="savings"
          amount={financialData.savings}
          change={monthlyChanges.savings}
          changePositive
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Spending Overview</h2>
              <p className="text-sm text-muted-foreground">Your spending this month</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimePeriod('this-month')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  timePeriod === 'this-month'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimePeriod('last-month')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  timePeriod === 'last-month'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                Last Month
              </button>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center rounded-lg bg-muted/50 border-2 border-dashed border-border">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Chart placeholder</p>
              <p className="text-xs text-muted-foreground mb-3">Charts will be implemented later</p>
              <Link to="/reports" className="text-xs font-medium text-primary hover:underline">
                View detailed reports
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Transactions</p>
                <p className="text-lg font-bold text-green-500">{transactions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Wallet className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Goals</p>
                <p className="text-lg font-bold">{goals.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <ArrowUpRight className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Balance</p>
                <p className="text-lg font-bold text-purple-500">
                  ${Number(financialData.balance).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions} />
        <SavingsGoals goals={goals} />
      </div>
    </div>
  )
}

export default DashboardPage