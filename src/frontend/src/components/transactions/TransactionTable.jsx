import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react'
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
  {
    id: 6,
    description: 'Coffee Shop',
    category: 'Food & Dining',
    amount: 8.50,
    type: 'EXPENSE',
    date: '2024-01-10',
    icon: '☕',
  },
  {
    id: 7,
    description: 'Gas Station',
    category: 'Transportation',
    amount: 45.00,
    type: 'EXPENSE',
    date: '2024-01-09',
    icon: '⛽',
  },
  {
    id: 8,
    description: 'Online Course',
    category: 'Education',
    amount: 99.00,
    type: 'EXPENSE',
    date: '2024-01-08',
    icon: '📚',
  },
]

function TransactionTable({ transactions = mockTransactions }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="transition-colors hover:bg-muted/50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <span className="text-lg">{transaction.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    {transaction.type === 'INCOME' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={cn(
                        'font-semibold',
                        transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {transaction.type === 'INCOME' ? '+' : '-'}
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="rounded-lg p-2 hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
