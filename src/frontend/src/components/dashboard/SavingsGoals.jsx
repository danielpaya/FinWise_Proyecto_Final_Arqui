import { Calendar, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

function SavingsGoals({ goals = [] }) {
  const recentGoals = goals.slice(0, 4)

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Savings Goals</h2>
        <Link to="/goals" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="divide-y divide-border">
        {recentGoals.length === 0 ? (
          <div className="px-6 py-8 text-sm text-muted-foreground">
            No saving goals found.
          </div>
        ) : (
          recentGoals.map((goal) => {
            const progress = Number(goal.progress || 0)
            const remaining = Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)

            return (
              <div
                key={goal.id}
                className="px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <span className="text-2xl">🎯</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{goal.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            Due: {goal.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">
                          ${remaining.toLocaleString()} left
                        </p>
                        <p className="text-lg font-bold">{progress.toFixed(0)}%</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">
                          ${Number(goal.currentAmount).toLocaleString()} of ${Number(goal.targetAmount).toLocaleString()}
                        </span>
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default SavingsGoals