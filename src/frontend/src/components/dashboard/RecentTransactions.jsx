import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

function RecentTransactions({ transactions = [] }) {
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link to="/transactions" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="divide-y divide-border">
        {recentTransactions.length === 0 ? (
          <div className="px-6 py-8 text-sm text-muted-foreground">
            No transactions found.
          </div>
        ) : (
          recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <span className="text-lg">
                    {transaction.type === 'INCOME' ? '💰' : '🧾'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category?.name || 'No category'}
                  </p>
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
                    ${Number(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <button className="rounded-lg p-2 hover:bg-muted transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentTransactions