import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import {Button} from '../ui/button'

function AddTransactionDialog({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    category: '',
    date: new Date().toISOString().split('T')[0],
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now(),
      icon: getCategoryIcon(formData.category),
    })
    setFormData({
      description: '',
      amount: '',
      type: 'EXPENSE',
      category: '',
      date: new Date().toISOString().split('T')[0],
    })
    onClose()
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Food & Dining': '🛒',
      'Entertainment': '🎬',
      'Utilities': '⚡',
      'Transportation': '⛽',
      'Education': '📚',
      'Income': '💰',
    }
    return icons[category] || '💳'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Add Transaction</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Education">Education</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTransactionDialog
