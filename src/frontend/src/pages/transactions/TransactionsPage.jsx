import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import SearchBar from '../../components/shared/SearchBar'
import TransactionTable from '../../components/transactions/TransactionTable'
import TransactionFilters from '../../components/transactions/TransactionFilters'
import AddTransactionDialog from '../../components/transactions/AddTransactionDialog'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import EmptyState from '../../components/shared/EmptyState'
import { Button } from '../../components/ui/button'
import { transactionService } from '../../services/transactionService'

function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await transactionService.getAllTransactions()
      if (response.success) {
        setTransactions(response.data || [])
      }
    } catch (err) {
      setError('Failed to load transactions')
      console.error('Error loading transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await transactionService.createTransaction(newTransaction)
      if (response.success) {
        await loadTransactions()
        setIsDialogOpen(false)
      }
    } catch (err) {
      console.error('Error adding transaction:', err)
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const categoryName = transaction.category?.name || transaction.categoryName || ''

    const matchesSearch =
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filters.type === 'all' || transaction.type === filters.type

    const matchesCategory =
      filters.category === 'all' || categoryName === filters.category

    const matchesDateFrom = !filters.dateFrom || transaction.date >= filters.dateFrom
    const matchesDateTo = !filters.dateTo || transaction.date <= filters.dateTo

    return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={Plus}
        title="Error loading transactions"
        description={error}
        action={
          <Button onClick={loadTransactions}>Try Again</Button>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="View and manage all your transactions"
      >
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search transactions..."
          className="lg:max-w-md"
        />
        <TransactionFilters
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {filteredTransactions.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No transactions found"
          description="Get started by adding your first transaction"
          action={
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          }
        />
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}

      <AddTransactionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  )
}

export default TransactionsPage
