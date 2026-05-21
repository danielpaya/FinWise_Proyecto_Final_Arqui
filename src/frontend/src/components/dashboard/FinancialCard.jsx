import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { cn } from '../../lib/utils'

const cardConfig = {
  balance: {
    icon: Wallet,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    label: 'Total Balance',
  },
  income: {
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Total Income',
  },
  expenses: {
    icon: TrendingDown,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    label: 'Total Expenses',
  },
  savings: {
    icon: PiggyBank,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    label: 'Total Savings',
  },
}

function FinancialCard({ type, amount, change, changePositive = true }) {
  const config = cardConfig[type]
  const Icon = config.icon

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{config.label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            ${typeof amount === 'number' ? amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : amount}
          </p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span className={cn(changePositive ? 'text-green-500' : 'text-red-500', 'font-medium')}>
                {changePositive ? '+' : ''}{change}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-3', config.bgColor)}>
          <Icon className={cn('h-6 w-6', config.color)} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}

export default FinancialCard
