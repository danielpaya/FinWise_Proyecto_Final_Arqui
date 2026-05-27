import { cn } from '../../lib/utils'

function BudgetProgress({ spent, limit, className }) {
  const percentage = (spent / limit) * 100
  
  const getStatusColor = () => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
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
          className={cn('h-full rounded-full transition-all duration-500', getStatusColor())}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${spent.toLocaleString()} spent</span>
        <span>${limit.toLocaleString()} limit</span>
      </div>
    </div>
  )
}

export default BudgetProgress
