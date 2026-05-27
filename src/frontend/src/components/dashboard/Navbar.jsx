import { Search, Bell, Menu } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from '../shared/ThemeToggle'

function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const fullName = user?.name || 'User'
  const firstName = fullName.split(' ')[0]
  const initials = fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            Good morning, <span className="text-primary">{firstName}</span>
          </h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search transactions, budgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            className="relative rounded-lg p-2 hover:bg-muted transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-1.5">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">{initials}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{fullName}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar