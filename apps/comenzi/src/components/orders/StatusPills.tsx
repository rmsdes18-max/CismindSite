import { FileText, Inbox, Loader, Check } from 'lucide-react'
import { STATUSES } from '@/lib/constants'
import type { OrderStatus } from '@/types/order'
import type { LucideIcon } from 'lucide-react'

const STATUS_CONFIG: Record<OrderStatus, { icon: LucideIcon; color: string }> = {
  oferta:     { icon: FileText, color: 'oferta' },
  nou:        { icon: Inbox,    color: 'nou' },
  'in-lucru': { icon: Loader,   color: 'lucru' },
  finalizat:  { icon: Check,    color: 'finalizat' },
}

interface Props {
  current: OrderStatus
  onChange: (status: OrderStatus) => void
}

export function StatusPills({ current, onChange }: Props) {
  return (
    <div className="col-span-full flex gap-1 items-center pt-1.5 border-t border-dashed border-rule">
      {STATUSES.map((s) => {
        const isActive = s.id === current
        const config = STATUS_CONFIG[s.id]
        const Icon = config.icon

        return (
          <button
            key={s.id}
            className={`font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-sm flex items-center gap-1.5 transition-all duration-150 ${
              isActive
                ? `bg-[var(--status-${config.color}-bg)] text-[var(--status-${config.color})] border border-[var(--status-${config.color})] font-semibold`
                : 'text-ink-faded border border-rule hover:text-ink hover:border-ink-faded'
            }`}
            onClick={() => onChange(s.id)}
          >
            {isActive && <Icon size={12} strokeWidth={2} />}
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
