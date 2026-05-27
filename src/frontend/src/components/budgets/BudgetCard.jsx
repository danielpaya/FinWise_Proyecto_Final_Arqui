import { cn } from '../../lib/utils'

function BudgetCard({ budget, className }) {
  const percentage = (budget.spent / budget.limit) * 100
  
  const getStatusColor = () => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStatusText = () => {
    if (percentage >= 90) return 'Critical'
    if (percentage >= 70) return 'Warning'
    return 'On Track'
  }

  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <span className="text-2xl">{budget.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold">{budget.category}</h3>
            <p className="text-sm text-muted-foreground">{budget.description}</p>
          </div>
        </div>
        <span className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          percentage >= 90 ? 'bg-red-500/10 text-red-500' :
          percentage >= 70 ? 'bg-yellow-500/10 text-yellow-500' :
          'bg-green-500/10 text-green-500'
        )}>
          {getStatusText()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className="font-medium">${budget.spent.toLocaleString()}</span>
        </div>
        
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-500', getStatusColor())}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Limit</span>
          <span className="font-medium">${budget.limit.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span className={cn(
            'font-semibold',
            budget.remaining >= 0 ? 'text-green-500' : 'text-red-500'
          )}>
            ${budget.remaining.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard
