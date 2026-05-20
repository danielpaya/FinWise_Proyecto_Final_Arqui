import { useEffect, useState } from 'react'
import { goalService } from '../../services/goalService'

function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      const response = await goalService.getAllGoals()
      setGoals(response.data || [])
    } catch (error) {
      console.error('Error loading goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalService.deleteGoal(id)
        loadGoals()
      } catch (error) {
        console.error('Error deleting goal:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center">Loading goals...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Savings Goals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.length === 0 ? (
          <div className="col-span-full bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
            No savings goals set
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-card border border-border rounded-lg p-6 ${
                goal.achieved ? 'border-green-500' : ''
              }`}
            >
              {goal.achieved && (
                <div className="mb-4 text-green-500 font-bold">🎉 Achieved!</div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{goal.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">${goal.targetAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-medium">${goal.currentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-medium">{goal.deadline}</span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all ${
                    goal.achieved ? 'bg-green-500' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
              </div>

              <button
                onClick={() => handleDelete(goal.id)}
                className="w-full px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                Delete Goal
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GoalsPage
