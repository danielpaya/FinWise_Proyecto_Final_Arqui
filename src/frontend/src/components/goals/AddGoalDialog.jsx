import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

function AddGoalDialog({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = 'Goal name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Goal name must be at least 3 characters'
    }

    if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Target amount must be greater than 0'
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    await onAdd({
      name: formData.name,
      targetAmount: Number(formData.targetAmount),
      deadline: formData.deadline,
    })

    setFormData({
      name: '',
      targetAmount: '',
      deadline: new Date().toISOString().split('T')[0],
    })

    setErrors({})
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Add Goal</h2>
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
            <label className="mb-2 block text-sm font-medium">Goal name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.name && 'border-destructive focus:ring-destructive/20'
              )}
              placeholder="Example: Viaje de grado"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Target amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) =>
                setFormData({ ...formData, targetAmount: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.targetAmount && 'border-destructive focus:ring-destructive/20'
              )}
              placeholder="0.00"
            />
            {errors.targetAmount && (
              <p className="mt-1 text-xs text-destructive">
                {errors.targetAmount}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              className={cn(
                'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                errors.deadline && 'border-destructive focus:ring-destructive/20'
              )}
            />
            {errors.deadline && (
              <p className="mt-1 text-xs text-destructive">{errors.deadline}</p>
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
              Add Goal
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGoalDialog