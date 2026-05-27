import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatsCard from '../../components/shared/StatsCard'
import BudgetCard from '../../components/budgets/BudgetCard'
import AddBudgetDialog from '../../components/budgets/AddBudgetDialog'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import EmptyState from '../../components/shared/EmptyState'
import { Button } from '../../components/ui/button'
import { budgetService } from '../../services/budgetService'

function BudgetsPage() {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await budgetService.getCurrentMonthBudgets()

      if (response.success) {
        setBudgets(response.data || [])
      } else {
        setError(response.message || 'Failed to load budgets')
      }
    } catch (err) {
      setError('Failed to load budgets')
      console.error('Error loading budgets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBudget = async (budgetData) => {
    try {
      const response = await budgetService.createBudget(budgetData)

      if (response.success) {
        await loadBudgets()
        setIsDialogOpen(false)
      } else {
        alert(response.message || 'Budget could not be created')
      }
    } catch (err) {
      console.error('Error creating budget:', err)
      alert('Error creating budget. Check console or backend logs.')
    }
  }

  const totalBudget = budgets.reduce(
    (sum, b) => sum + Number(b.limitAmount || 0),
    0
  )

  const totalSpent = budgets.reduce(
    (sum, b) => sum + Number(b.spentAmount || 0),
    0
  )

  const totalRemaining = totalBudget - totalSpent

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
        icon={Plus}
        title="Error loading budgets"
        description={error}
        action={<Button onClick={loadBudgets}>Try Again</Button>}
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budgets"
        description="Manage your monthly spending limits"
      >
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
          change="This month"
          changeType="neutral"
        />
        <StatsCard
          title="Total Spent"
          value={`$${totalSpent.toLocaleString()}`}
          change={`$${totalRemaining >= 0 ? totalRemaining.toLocaleString() : 0} remaining`}
          changeType={totalRemaining >= 0 ? 'positive' : 'negative'}
        />
        <StatsCard
          title="Active Budgets"
          value={budgets.length}
          change="categories"
          changeType="neutral"
        />
      </div>

      {budgets.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No budgets set"
          description="Create your first budget to start tracking your spending"
          action={
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}

      <AddBudgetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddBudget}
      />
    </div>
  )
}

export default BudgetsPage