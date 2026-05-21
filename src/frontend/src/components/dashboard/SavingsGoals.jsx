import { Target, Calendar, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const mockGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 7500,
    deadline: '2024-06-30',
    icon: '🛡️',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'New Laptop',
    targetAmount: 2500,
    currentAmount: 1800,
    deadline: '2024-04-15',
    icon: '💻',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 1200,
    deadline: '2024-08-01',
    icon: '✈️',
    color: 'bg-green-500',
  },
  {
    id: 4,
    name: 'Car Down Payment',
    targetAmount: 15000,
    currentAmount: 4500,
    deadline: '2024-12-31',
    icon: '🚗',
    color: 'bg-orange-500',
  },
]

function SavingsGoals() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Savings Goals</h2>
        <Link to="/goals" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>
      
      <div className="divide-y divide-border">
        {mockGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const remaining = goal.targetAmount - goal.currentAmount
          
          return (
            <div
              key={goal.id}
              className="px-6 py-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <span className="text-2xl">{goal.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{goal.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">
                        ${remaining.toLocaleString()} left
                      </p>
                      <p className="text-lg font-bold">{progress.toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">
                        ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                      </span>
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500', goal.color)}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SavingsGoals
