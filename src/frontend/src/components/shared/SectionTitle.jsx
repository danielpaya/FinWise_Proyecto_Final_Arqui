import { cn } from '../../lib/utils'

function SectionTitle({ title, description, className }) {
  return (
    <div className={cn('space-y-1', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export default SectionTitle
