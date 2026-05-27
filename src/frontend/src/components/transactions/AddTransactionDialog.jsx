import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

const categories = [
  { id: 1, name: 'Salary', type: 'INCOME' },
  { id: 4, name: 'Food', type: 'EXPENSE' },
  { id: 5, name: 'Transport', type: 'EXPENSE' },
  { id: 6, name: 'Entertainment', type: 'EXPENSE' },
]

function AddTransactionDialog({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const availableCategories = categories.filter(
    (category) => category.type === formData.type
  )

  const validate = () => {
    const newErrors = {}

    if (!formData.description) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 3) {
      newErrors.description = 'Description must be at least 3 characters'
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type,
      categoryId: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    await onAdd({
      amount: Number(formData.amount),
      description: formData.description,
      date: formData.date,
      categoryId: Number(formData.categoryId),
      type: formData.type,
    })

    setFormData({
      description: '',
      amount: '',
      type: 'EXPENSE',
      categoryId: '',
      date: new Date().toISOString().split('T')[0],
    })

    setErrors({})
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.description && 'border-destructive focus:ring-destructive/20'
              )}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.amount && 'border-destructive focus:ring-destructive/20'
              )}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-destructive">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.categoryId && 'border-destructive focus:ring-destructive/20'
              )}
            >
              <option value="">Select category</option>
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-xs text-destructive">
                {errors.categoryId}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.date && 'border-destructive focus:ring-destructive/20'
              )}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-destructive">{errors.date}</p>
            )}
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