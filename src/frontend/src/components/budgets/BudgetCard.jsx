import { cn } from '../../lib/utils'

function BudgetCard({ budget, className }) {
  const limitAmount = Number(budget.limitAmount || budget.limit || 0)
  const spentAmount = Number(budget.spentAmount || budget.spent || 0)

  const remainingAmount =
    budget.remainingAmount !== undefined && budget.remainingAmount !== null
      ? Number(budget.remainingAmount)
      : limitAmount - spentAmount

  const percentage =
    budget.consumptionPercentage !== undefined && budget.consumptionPercentage !== null
      ? Number(budget.consumptionPercentage)
      : limitAmount > 0
        ? (spentAmount / limitAmount) * 100
        : 0

  const categoryName =
    budget.categoryName ||
    budget.category?.name ||
    budget.category ||
    'No category'

  const getStatusColor = () => {
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStatusText = () => {
    if (budget.status) return budget.status
    if (percentage >= 100) return 'EXCEEDED'
    if (percentage >= 80) return 'WARNING'
    return 'OK'
  }

  const getStatusClass = () => {
    if (percentage >= 100) return 'bg-red-500/10 text-red-500'
    if (percentage >= 80) return 'bg-yellow-500/10 text-yellow-500'
    return 'bg-green-500/10 text-green-500'
  }

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
            <span className="text-2xl">💳</span>
          </div>

          <div>
            <h3 className="font-semibold">{categoryName}</h3>
            <p className="text-sm text-muted-foreground">
              {budget.month}/{budget.year}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            getStatusClass()
          )}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className="font-medium">
            ${spentAmount.toLocaleString()}
          </span>
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

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Limit</span>
          <span className="font-medium">
            ${limitAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span
            className={cn(
              'font-semibold',
              remainingAmount >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            ${remainingAmount.toLocaleString()}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Consumption: {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  )
}

export default BudgetCard