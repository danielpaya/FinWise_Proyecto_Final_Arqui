import { Calendar, Target } from 'lucide-react'
import { cn } from '../../lib/utils'

function GoalCard({ goal, className }) {
  const name = goal.name || goal.title || 'Unnamed goal'

  const targetAmount = Number(goal.targetAmount || goal.target || 0)
  const currentAmount = Number(goal.currentAmount || goal.saved || goal.current || 0)

  const remainingAmount = Math.max(targetAmount - currentAmount, 0)

  const progress =
    goal.progress !== undefined && goal.progress !== null
      ? Number(goal.progress)
      : targetAmount > 0
        ? (currentAmount / targetAmount) * 100
        : 0

  const deadline = goal.deadline || goal.dueDate || null
  const achieved = goal.achieved || progress >= 100

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No deadline'

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Target className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Due: {formattedDeadline}</span>
            </div>
          </div>
        </div>

        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            achieved
              ? 'bg-green-500/10 text-green-500'
              : progress >= 75
                ? 'bg-blue-500/10 text-blue-500'
                : 'bg-yellow-500/10 text-yellow-500'
          )}
        >
          {achieved ? 'ACHIEVED' : `${progress.toFixed(0)}%`}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Saved</span>
          <span className="font-medium">
            ${currentAmount.toLocaleString()}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              achieved
                ? 'bg-green-500'
                : progress >= 75
                  ? 'bg-blue-500'
                  : 'bg-yellow-500'
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Target</span>
          <span className="font-medium">
            ${targetAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span
            className={cn(
              'font-semibold',
              remainingAmount <= 0 ? 'text-green-500' : 'text-primary'
            )}
          >
            ${remainingAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GoalCard