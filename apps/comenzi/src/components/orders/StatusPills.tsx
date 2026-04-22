import { STATUSES } from '@/lib/constants'
import type { OrderStatus } from '@/types/order'

interface Props {
  current: OrderStatus
  onChange: (status: OrderStatus) => void
}

const activeBg: Record<string, string> = {
  'in-lucru': 'bg-accent',
  finalizat:  'bg-green',
}

export function StatusPills({ current, onChange }: Props) {
  return (
    <div className="col-span-full flex gap-1 items-center pt-1.5 border-t border-dashed border-rule">
      {STATUSES.map((s) => {
        const isActive = s.id === current
        const bg = isActive ? (activeBg[s.id] ?? 'bg-ink') : ''
        return (
          <button
            key={s.id}
            className={`font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-sm transition-all ${
              isActive
                ? `${bg} text-paper`
                : 'text-ink-faded hover:text-ink hover:bg-rule-soft'
            }`}
            onClick={() => onChange(s.id)}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
