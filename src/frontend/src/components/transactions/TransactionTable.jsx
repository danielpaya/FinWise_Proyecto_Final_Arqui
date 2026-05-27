import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '../../lib/utils'

function TransactionTable({ transactions = [], onEdit, onDelete }) {
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
            {transactions.map((transaction) => {
              const categoryName =
                transaction.category?.name ||
                transaction.categoryName ||
                'No category'

              const amount = Number(transaction.amount || 0)

              return (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <span className="text-lg">
                          {transaction.type === 'INCOME' ? '💰' : '🧾'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                      {categoryName}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'No date'}
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
                          transaction.type === 'INCOME'
                            ? 'text-green-500'
                            : 'text-red-500'
                        )}
                      >
                        {transaction.type === 'INCOME' ? '+' : '-'}
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="rounded-lg px-3 py-1 text-xs bg-muted hover:bg-muted/80 transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(transaction.id)}
                        className="rounded-lg px-3 py-1 text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable