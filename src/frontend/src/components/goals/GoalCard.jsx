import { Calendar, TrendingUp, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

function GoalCard({ goal, onContribute, className }) {
  const progress = (goal.current / goal.target) * 100
  const remaining = goal.target - goal.current

  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <span className="text-2xl">{goal.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold">{goal.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Due: {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{progress.toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground">complete</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
          </span>
        </div>
        
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-500', goal.color)}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              ${remaining.toLocaleString()} left
            </span>
          </div>
          <Button size="sm" onClick={() => onContribute(goal)}>
            <Plus className="mr-1 h-3 w-3" />
            Contribute
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GoalCard
