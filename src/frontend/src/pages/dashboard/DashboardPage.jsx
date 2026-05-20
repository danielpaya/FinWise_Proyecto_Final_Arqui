import { useEffect, useState } from 'react'
import { transactionService } from '../../services/transactionService'
import { budgetService } from '../../services/budgetService'
import { goalService } from '../../services/goalService'

function DashboardPage() {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [transactionsRes, budgetsRes, goalsRes] = await Promise.all([
        transactionService.getAllTransactions(),
        budgetService.getCurrentMonthBudgets(),
        goalService.getAllGoals(),
      ])

      setTransactions(transactionsRes.data || [])
      setBudgets(budgetsRes.data || [])
      setGoals(goalsRes.data || [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>
  }

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const totalExpenses = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const balance = totalIncome - totalExpenses

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Balance</h3>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-muted-foreground">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category?.name}</p>
                </div>
                <p
                  className={`font-bold ${
                    transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Budget Overview */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Budget Overview</h2>
        {budgets.length === 0 ? (
          <p className="text-muted-foreground">No budgets set for this month</p>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spentAmount / budget.limitAmount) * 100
              return (
                <div key={budget.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{budget.categoryName}</span>
                    <span className="text-sm text-muted-foreground">
                      ${budget.spentAmount} / ${budget.limitAmount}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Goals Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Savings Goals</h2>
        {goals.length === 0 ? (
          <p className="text-muted-foreground">No savings goals set</p>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">{goal.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  ${goal.currentAmount} of ${goal.targetAmount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
