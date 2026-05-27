import { cn } from '../../lib/utils'

function GoalProgress({ current, target, color = 'bg-primary', className }) {
  const progress = (current / target) * 100

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{progress.toFixed(0)}%</span>
      </div>
      
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${current.toLocaleString()} saved</span>
        <span>${target.toLocaleString()} goal</span>
      </div>
    </div>
  )
}

export default GoalProgress
