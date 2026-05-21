import { cn } from '../../lib/utils'

function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, className }) {
  const changeColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-muted-foreground',
  }

  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 shadow-sm', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <p className={cn('mt-2 text-sm font-medium', changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-muted p-3">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
