import { Filter } from 'lucide-react'
import { cn } from '../../lib/utils'

function TransactionFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <select
          value={filters.type || 'all'}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <select
          value={filters.category || 'all'}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Education">Education</option>
          <option value="Income">Income</option>
        </select>

        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />

        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted transition-colors">
        <Filter className="h-4 w-4" />
        <span>More Filters</span>
      </button>
    </div>
  )
}

export default TransactionFilters
