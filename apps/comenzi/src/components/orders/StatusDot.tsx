import type { OrderStatus } from '@/types/order'
import { nextStatus, statusLabel } from '@/lib/dates'

const dotStyles: Record<OrderStatus, string> = {
  oferta:     'bg-status-oferta',
  nou:        'bg-transparent border-[1.5px] border-status-nou',
  'in-lucru': 'bg-status-lucru shadow-[0_0_0_3px_rgba(59,122,158,0.15)]',
  finalizat:  'bg-status-finalizat',
}

interface Props {
  status: OrderStatus
  onAdvance: () => void
}

export function StatusDot({ status, onAdvance }: Props) {
  return (
    <button
      className={`w-2.5 h-2.5 rounded-full mt-2.5 shrink-0 justify-self-start transition-transform hover:scale-130 ${dotStyles[status]}`}
      onClick={(e) => {
        e.stopPropagation()
        onAdvance()
      }}
      title={`Status: ${statusLabel(status)} (click: avansează la ${statusLabel(nextStatus(status))})`}
    />
  )
}
