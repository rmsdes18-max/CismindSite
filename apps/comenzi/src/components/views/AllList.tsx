import { useState, useMemo } from 'react'
import type { Order, OrderItem, OrderStatus } from '@/types/order'
import { STATUSES } from '@/lib/constants'
import { OrderCard } from '@/components/orders/OrderCard'

interface Props {
  orders: Order[]
  openId: string | null
  setOpenId: (id: string | null) => void
  onChangeStatus: (id: string, status: OrderStatus) => void
  onAddNote: (id: string, text: string) => void
  onAddVersion: (id: string, note: string) => void
  onAddItem: (id: string, item: OrderItem) => void
  onUpdateField?: (id: string, fields: Record<string, unknown>) => void
  onUpdateItem?: (id: string, index: number, item: OrderItem) => void
  onDeleteItem?: (id: string, index: number) => void
  onDeleteNote?: (id: string, index: number) => void
  onDelete?: (id: string) => void
}

export function AllList({
  orders,
  openId,
  setOpenId,
  onChangeStatus,
  onAddNote,
  onAddVersion,
  onAddItem,
  onUpdateField,
  onUpdateItem,
  onDeleteItem,
  onDeleteNote,
  onDelete,
}: Props) {
  const [filter, setFilter] = useState<'all' | OrderStatus>('all')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length }
    STATUSES.forEach((s) => {
      c[s.id] = orders.filter((o) => o.status === s.id).length
    })
    return c
  }, [orders])

  const filtered = useMemo(() => {
    const f = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
    return [...f].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  }, [orders, filter])

  const cardProps = { onChangeStatus, onAddNote, onAddVersion, onAddItem, onUpdateField, onUpdateItem, onDeleteItem, onDeleteNote, onDelete }

  return (
    <div>
      <div className="flex gap-4.5 mb-5 pb-2.5 border-b border-dashed border-rule flex-wrap">
        <button
          className={`font-mono text-[11px] uppercase tracking-[0.08em] py-1 border-b ${
            filter === 'all'
              ? 'text-ink border-accent'
              : 'text-ink-faded border-transparent'
          }`}
          onClick={() => setFilter('all')}
        >
          Toate{' '}
          <span className={`ml-1.5 text-[10px] ${filter === 'all' ? 'text-accent' : 'text-ink-faded'}`}>
            {counts['all']}
          </span>
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.id}
            className={`font-mono text-[11px] uppercase tracking-[0.08em] py-1 border-b ${
              filter === s.id
                ? 'text-ink border-accent'
                : 'text-ink-faded border-transparent'
            }`}
            onClick={() => setFilter(s.id)}
          >
            {s.label}{' '}
            <span className={`ml-1.5 text-[10px] ${filter === s.id ? 'text-accent' : 'text-ink-faded'}`}>
              {counts[s.id]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-15 text-center font-display italic text-lg text-ink-faded">— gol —</div>
      )}

      {filtered.map((o) => (
        <OrderCard
          key={o.id}
          order={o}
          isOpen={openId === o.id}
          onToggle={(id) => setOpenId(openId === id ? null : id)}
          {...cardProps}
        />
      ))}
    </div>
  )
}
