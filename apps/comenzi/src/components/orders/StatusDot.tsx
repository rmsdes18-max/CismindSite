import { FileText, Inbox, Loader, Check } from 'lucide-react'
import type { OrderStatus } from '@/types/order'
import { nextStatus, statusLabel } from '@/lib/dates'
import type { LucideIcon } from 'lucide-react'

const STATUS_CONFIG: Record<OrderStatus, { icon: LucideIcon; color: string }> = {
  oferta:     { icon: FileText, color: 'var(--status-oferta)' },
  nou:        { icon: Inbox,    color: 'var(--status-nou)' },
  'in-lucru': { icon: Loader,   color: 'var(--status-lucru)' },
  finalizat:  { icon: Check,    color: 'var(--status-finalizat)' },
}

interface Props {
  status: OrderStatus
  onAdvance: () => void
}

export function StatusDot({ status, onAdvance }: Props) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <button
      className="shrink-0 mt-1.5 transition-transform hover:scale-125 order-2 sm:order-none justify-self-end sm:justify-self-start"
      onClick={(e) => {
        e.stopPropagation()
        onAdvance()
      }}
      title={`Status: ${statusLabel(status)} (click: avansează la ${statusLabel(nextStatus(status))})`}
    >
      <Icon size={16} strokeWidth={2} style={{ color: config.color }} />
    </button>
  )
}
