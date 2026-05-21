import { cn } from '../../lib/utils'

function AuthCard({ children, className }) {
  return (
    <div className={cn(
      'w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl',
      className
    )}>
      {children}
    </div>
  )
}

export default AuthCard
