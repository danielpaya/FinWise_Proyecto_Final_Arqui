import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Wallet, Target, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: CreditCard },
  { path: '/budgets', label: 'Budgets', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 transform border-r border-border bg-card transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">FW</span>
              </div>
              <span className="text-lg font-bold">FinWise AI</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-bold text-primary-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">John Doe</p>
                <p className="truncate text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
