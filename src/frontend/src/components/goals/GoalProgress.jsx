import { cn } from '../../lib/utils'

function GoalProgress({ current = 0, target = 0, progress, className }) {
  const currentAmount = Number(current || 0)
  const targetAmount = Number(target || 0)

  const percentage =
    progress !== undefined && progress !== null
      ? Number(progress)
      : targetAmount > 0
        ? (currentAmount / targetAmount) * 100
        : 0

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${currentAmount.toLocaleString()} saved</span>
        <span>${targetAmount.toLocaleString()} target</span>
      </div>
    </div>
  )
}

export default GoalProgress