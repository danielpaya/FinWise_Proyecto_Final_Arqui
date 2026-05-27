import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

const categories = [
  { id: 4, name: 'Food', type: 'EXPENSE' },
  { id: 5, name: 'Transport', type: 'EXPENSE' },
  { id: 6, name: 'Entertainment', type: 'EXPENSE' },
]

function AddBudgetDialog({ isOpen, onClose, onAdd }) {
  const currentDate = new Date()

  const [formData, setFormData] = useState({
    limitAmount: '',
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    categoryId: '',
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}

    if (!formData.limitAmount || Number(formData.limitAmount) <= 0) {
      newErrors.limitAmount = 'Limit amount must be greater than 0'
    }

    if (!formData.month || Number(formData.month) < 1 || Number(formData.month) > 12) {
      newErrors.month = 'Month must be between 1 and 12'
    }

    if (!formData.year || Number(formData.year) < 2020) {
      newErrors.year = 'Year is required'
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    await onAdd({
      limitAmount: Number(formData.limitAmount),
      month: Number(formData.month),
      year: Number(formData.year),
      categoryId: Number(formData.categoryId),
    })

    setFormData({
      limitAmount: '',
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      categoryId: '',
    })

    setErrors({})
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Add Budget</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Limit amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.limitAmount}
              onChange={(e) =>
                setFormData({ ...formData, limitAmount: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.limitAmount && 'border-destructive focus:ring-destructive/20'
              )}
              placeholder="0.00"
            />
            {errors.limitAmount && (
              <p className="mt-1 text-xs text-destructive">{errors.limitAmount}</p>
            )}
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
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-xs text-destructive">{errors.categoryId}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Month</label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.month}
                onChange={(e) =>
                  setFormData({ ...formData, month: e.target.value })
                }
                className={cn(
                  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                  errors.month && 'border-destructive focus:ring-destructive/20'
                )}
              />
              {errors.month && (
                <p className="mt-1 text-xs text-destructive">{errors.month}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className={cn(
                  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                  errors.year && 'border-destructive focus:ring-destructive/20'
                )}
              />
              {errors.year && (
                <p className="mt-1 text-xs text-destructive">{errors.year}</p>
              )}
            </div>
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
              Add Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBudgetDialog