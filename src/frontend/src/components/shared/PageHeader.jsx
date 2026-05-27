import { cn } from '../../lib/utils'

function PageHeader({ title, description, children, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
}

export default PageHeader
