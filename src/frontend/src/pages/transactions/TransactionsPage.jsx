import { useEffect, useState } from 'react'
import { transactionService } from '../../services/transactionService'

function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    loadTransactions()
  }, [filter])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      let response
      if (filter === 'ALL') {
        response = await transactionService.getAllTransactions()
      } else {
        response = await transactionService.getTransactionsByType(filter)
      }
      setTransactions(response.data || [])
    } catch (error) {
      console.error('Error loading transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.deleteTransaction(id)
        loadTransactions()
      } catch (error) {
        console.error('Error deleting transaction:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center">Loading transactions...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['ALL', 'INCOME', 'EXPENSE'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-card border border-border rounded-lg">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No transactions found</div>
        ) : (
          <div className="divide-y divide-border">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category?.name} • {transaction.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount}
                  </p>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-destructive hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage
