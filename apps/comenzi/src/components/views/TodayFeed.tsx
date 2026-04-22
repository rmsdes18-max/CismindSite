import { useMemo } from 'react'
import type { Order, OrderItem, OrderStatus } from '@/types/order'
import { dayBucketLabel } from '@/lib/dates'
import { OrderCard } from '@/components/orders/OrderCard'

interface Props {
  orders: Order[]
  openId: string | null
  setOpenId: (id: string | null) => void
  onChangeStatus: (id: string, status: OrderStatus) => void
  onAddNote: (id: string, text: string) => void
  onAddVersion: (id: string, note: string) => void
  onAddItem: (id: string, item: OrderItem) => void
  onDelete?: (id: string) => void
}

export function TodayFeed({
  orders,
  openId,
  setOpenId,
  onChangeStatus,
  onAddNote,
  onAddVersion,
  onAddItem,
  onDelete,
}: Props) {
  const buckets = useMemo(() => {
    const sorted = [...orders]
      .filter((o) => o.status !== 'finalizat')
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

    const groups: Record<string, { key: string; label: string; meta: string; items: Order[] }> = {}
    const order: string[] = []

    sorted.forEach((o) => {
      const b = dayBucketLabel(o.deadline)
      if (!groups[b.key]) {
        groups[b.key] = { ...b, items: [] }
        order.push(b.key)
      }
      groups[b.key]!.items.push(o)
    })

    return order.map((k) => groups[k]!)
  }, [orders])

  const done = useMemo(() => orders.filter((o) => o.status === 'finalizat'), [orders])

  if (buckets.length === 0 && done.length === 0) {
    return (
      <div className="py-15 text-center font-display italic text-lg text-ink-faded">
        Nimic de făcut. Bea o cafea.
      </div>
    )
  }

  const cardProps = { onChangeStatus, onAddNote, onAddVersion, onAddItem, onDelete }

  return (
    <div>
      {buckets.map((bucket) => (
        <div key={bucket.key} className="[&+&]:mt-11">
          <div
            className={`flex items-baseline justify-between mb-3.5 pb-2.5 border-b border-dashed border-rule ${
              bucket.key === 'azi' ? '[&_.day-label]:text-accent' : ''
            }`}
          >
            <div className="day-label font-display italic text-xl font-normal tracking-[-0.01em]">
              {bucket.label}
            </div>
            <div className="font-mono text-[11px] text-ink-faded tracking-[0.05em]">
              {bucket.meta} · {bucket.items.length}
            </div>
          </div>
          {bucket.items.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              isOpen={openId === o.id}
              onToggle={(id) => setOpenId(openId === id ? null : id)}
              {...cardProps}
            />
          ))}
        </div>
      ))}

      {done.length > 0 && (
        <div className="mt-11">
          <div className="flex items-baseline justify-between mb-3.5 pb-2.5 border-b border-dashed border-rule">
            <div className="font-display text-[15px] font-normal text-ink-faded">
              Finalizate recent
            </div>
            <div className="font-mono text-[11px] text-ink-faded tracking-[0.05em]">
              {done.length}
            </div>
          </div>
          {done.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              isOpen={openId === o.id}
              onToggle={(id) => setOpenId(openId === id ? null : id)}
              {...cardProps}
            />
          ))}
        </div>
      )}
    </div>
  )
}
