import { cn } from '../../lib/utils'

function BudgetProgress({ spent = 0, limit = 0, className }) {
  const spentAmount = Number(spent || 0)
  const limitAmount = Number(limit || 0)

  const percentage = limitAmount > 0 ? (spentAmount / limitAmount) * 100 : 0

  const getStatusColor = () => {
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            getStatusColor()
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${spentAmount.toLocaleString()} spent</span>
        <span>${limitAmount.toLocaleString()} limit</span>
      </div>
    </div>
  )
}

export default BudgetProgress