import { useEffect, useState } from 'react'
import { budgetService } from '../../services/budgetService'

function BudgetsPage() {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = async () => {
    try {
      const response = await budgetService.getCurrentMonthBudgets()
      setBudgets(response.data || [])
    } catch (error) {
      console.error('Error loading budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetService.deleteBudget(id)
        loadBudgets()
      } catch (error) {
        console.error('Error deleting budget:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center">Loading budgets...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Budgets</h1>

      <div className="bg-card border border-border rounded-lg">
        {budgets.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No budgets set for this month</div>
        ) : (
          <div className="divide-y divide-border">
            {budgets.map((budget) => {
              const percentage = (budget.spentAmount / budget.limitAmount) * 100
              return (
                <div key={budget.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{budget.categoryName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {budget.month}/{budget.year}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="text-destructive hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Limit</p>
                      <p className="text-2xl font-bold">${budget.limitAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Spent</p>
                      <p className="text-2xl font-bold text-red-500">${budget.spentAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-2xl font-bold text-green-500">${budget.remainingAmount}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetsPage
