import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const mockTransactions = [
  {
    id: 1,
    description: 'Salary Deposit',
    category: 'Income',
    amount: 4500.00,
    type: 'INCOME',
    date: '2024-01-15',
    icon: '💰',
  },
  {
    id: 2,
    description: 'Grocery Store',
    category: 'Food & Dining',
    amount: 156.32,
    type: 'EXPENSE',
    date: '2024-01-14',
    icon: '🛒',
  },
  {
    id: 3,
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 15.99,
    type: 'EXPENSE',
    date: '2024-01-13',
    icon: '🎬',
  },
  {
    id: 4,
    description: 'Freelance Payment',
    category: 'Income',
    amount: 850.00,
    type: 'INCOME',
    date: '2024-01-12',
    icon: '💼',
  },
  {
    id: 5,
    description: 'Electric Bill',
    category: 'Utilities',
    amount: 124.50,
    type: 'EXPENSE',
    date: '2024-01-11',
    icon: '⚡',
  },
]

function RecentTransactions() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link to="/transactions" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>
      
      <div className="divide-y divide-border">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <span className="text-lg">{transaction.icon}</span>
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p
                  className={cn(
                    'font-semibold',
                    transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {transaction.type === 'INCOME' ? '+' : '-'}
                  ${transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <button className="rounded-lg p-2 hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions
