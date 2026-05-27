import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatsCard from '../../components/shared/StatsCard'
import GoalCard from '../../components/goals/GoalCard'
import AddGoalDialog from '../../components/goals/AddGoalDialog'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import EmptyState from '../../components/shared/EmptyState'
import { Button } from '../../components/ui/button'
import { goalService } from '../../services/goalService'

function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await goalService.getAllGoals()

      if (response.success) {
        setGoals(response.data || [])
      } else {
        setError(response.message || 'Failed to load goals')
      }
    } catch (err) {
      setError('Failed to load goals')
      console.error('Error loading goals:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGoal = async (goalData) => {
    try {
      const response = await goalService.createGoal(goalData)

      if (response.success) {
        await loadGoals()
        setIsDialogOpen(false)
      } else {
        alert(response.message || 'Goal could not be created')
      }
    } catch (err) {
      console.error('Error creating goal:', err)
      alert('Error creating goal. Check console or backend logs.')
    }
  }

  const handleContribute = async (goalId, amount) => {
    try {
      await goalService.contributeToGoal(goalId, amount)
      await loadGoals()
    } catch (err) {
      console.error('Error contributing to goal:', err)
    }
  }

  const totalTarget = goals.reduce(
    (sum, g) => sum + Number(g.targetAmount || 0),
    0
  )

  const totalSaved = goals.reduce(
    (sum, g) => sum + Number(g.currentAmount || 0),
    0
  )

  const averageProgress =
    goals.length > 0
      ? goals.reduce((sum, g) => {
          const target = Number(g.targetAmount || 0)
          const current = Number(g.currentAmount || 0)
          return sum + (target > 0 ? (current / target) * 100 : 0)
        }, 0) / goals.length
      : 0

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
        title="Error loading goals"
        description={error}
        action={<Button onClick={loadGoals}>Try Again</Button>}
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Savings Goals"
        description="Track your financial goals and milestones"
      >
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Target"
          value={`$${totalTarget.toLocaleString()}`}
          change="All goals"
          changeType="neutral"
        />
        <StatsCard
          title="Total Saved"
          value={`$${totalSaved.toLocaleString()}`}
          change={`${averageProgress.toFixed(0)}% avg progress`}
          changeType="positive"
        />
        <StatsCard
          title="Active Goals"
          value={goals.length}
          change="in progress"
          changeType="neutral"
        />
      </div>

      {goals.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No savings goals"
          description="Create your first savings goal to start tracking your progress"
          action={
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onContribute={handleContribute}
            />
          ))}
        </div>
      )}

      <AddGoalDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddGoal}
      />
    </div>
  )
}

export default GoalsPage