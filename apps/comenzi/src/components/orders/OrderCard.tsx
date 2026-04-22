import { useState } from 'react'
import type { Order, OrderItem, OrderStatus } from '@/types/order'
import { CHANNELS } from '@/lib/constants'
import { dayDiff, fmtDateShort } from '@/lib/dates'
import { formatPhone } from '@/lib/format'
import { StatusDot } from './StatusDot'
import { StatusPills } from './StatusPills'
import { ProductList } from './ProductList'
import { AddProductForm } from './AddProductForm'
// TODO: reactivare versiuni când business-ul cere iterații vizuale
// import { VersionsBlock } from './VersionsBlock'
import { NotesBlock } from './NotesBlock'
import { DriveFolders } from './DriveFolders'

interface Props {
  order: Order
  isOpen: boolean
  onToggle: (id: string) => void
  onChangeStatus: (id: string, status: OrderStatus) => void
  onAddNote: (id: string, text: string) => void
  onAddVersion: (id: string, note: string) => void
  onAddItem: (id: string, item: OrderItem) => void
  onDelete?: (id: string) => void
  showDeadline?: boolean
}

export function OrderCard({
  order,
  isOpen,
  onToggle,
  onChangeStatus,
  onAddNote,
  onAddVersion: _onAddVersion,
  onAddItem,
  onDelete,
  showDeadline = true,
}: Props) {
  const [addingItem, setAddingItem] = useState(false)

  const now = new Date()
  const diff = dayDiff(new Date(order.deadline), now)
  const isUrgent = diff <= 0 && order.status !== 'finalizat'
  const isDone = order.status === 'finalizat'

  const totalQty = order.items.reduce((s, it) => s + it.qty, 0)
  const itemSummary =
    order.items.length === 1
      ? order.items[0]!.qty + ' × ' + order.items[0]!.what.toLowerCase()
      : order.items.length + ' produse · ' + totalQty + ' buc total'

  return (
    <div
      className={`grid items-start gap-3.5 py-4 border-b border-rule-soft cursor-pointer transition-colors hover:bg-accent/[0.025] last:border-b-0 ${
        isOpen
          ? 'grid-cols-[14px_1fr] bg-paper-deep -mx-4 px-4 border-b-rule'
          : 'grid-cols-[14px_1fr_auto]'
      }`}
      onClick={() => onToggle(order.id)}
    >
      <StatusDot
        status={order.status}
        onAdvance={() => onChangeStatus(order.id, (
          order.status === 'oferta' ? 'nou' :
          order.status === 'nou' ? 'in-lucru' :
          order.status === 'in-lucru' ? 'finalizat' : 'oferta'
        ) as OrderStatus)}
      />

      <div className="min-w-0">
        <h3
          className={`font-display text-[19px] font-normal tracking-[-0.01em] leading-[1.3] m-0 mb-1 ${
            isDone ? 'line-through decoration-ink-faded text-ink-faded' : ''
          }`}
        >
          <span className="font-mono text-[11px] text-ink-faded mr-2 tracking-normal font-normal align-[2px]">
            #{order.id}
          </span>
          {order.name}
        </h3>
        <div className="font-mono text-[13px] text-ink-soft leading-6">
          <div className="flex flex-wrap gap-x-3.5 gap-y-0.5">
            <span className="text-ink">{order.client}</span>
            <span className="text-rule">·</span>
            <span>{formatPhone(order.contact)}</span>
          </div>
          <div className="flex flex-wrap gap-x-3.5 gap-y-0.5">
            <span>{itemSummary}</span>
            <span className="text-rule">·</span>
            <span className="text-ink-faded">{CHANNELS[order.channel]}</span>
          </div>
        </div>

        {isOpen && (
          <div
            className="col-span-full pt-2.5 mt-2.5 border-t border-dashed border-rule grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Meta fields — side by side on all screens */}
            <div className="col-span-full flex gap-6 justify-between">
              <div className="font-mono text-sm leading-relaxed">
                <span className="block text-ink-faded text-[10px] tracking-[0.1em] uppercase mb-1">
                  Client · {CHANNELS[order.channel]}
                </span>
                <span className="text-ink">{order.client}</span>
                <div className="font-mono text-[11px] text-ink-faded mt-0.5">{formatPhone(order.contact)}</div>
              </div>
              <div className="font-mono text-sm leading-relaxed text-right">
                <span className="block text-ink-faded text-[10px] tracking-[0.1em] uppercase mb-1">
                  Deadline
                </span>
                <span className="text-ink font-semibold">
                  {fmtDateShort(order.deadline)}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="col-span-full pt-1.5 border-t border-dashed border-rule mt-1.5">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
                  Produse
                </span>
                <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em]">
                  {order.items.length} {order.items.length === 1 ? 'produs' : 'produse'}
                </span>
              </div>
              <ProductList items={order.items} />
              {!addingItem && (
                <button
                  className="font-mono text-[11px] tracking-[0.06em] text-accent py-1.5 hover:underline"
                  onClick={() => setAddingItem(true)}
                >
                  + adaugă încă un produs
                </button>
              )}
              {addingItem && (
                <AddProductForm
                  onAdd={(item) => {
                    onAddItem(order.id, item)
                    setAddingItem(false)
                  }}
                  onCancel={() => setAddingItem(false)}
                />
              )}
            </div>

            {/* TODO: reactivare versiuni când business-ul cere iterații vizuale */}

            <NotesBlock
              notes={order.notes}
              onAddNote={(text) => onAddNote(order.id, text)}
            />

            <DriveFolders drive={order.drive} />

            <StatusPills
              current={order.status}
              onChange={(status) => onChangeStatus(order.id, status)}
            />

            {onDelete && (
              <div className="col-span-full flex justify-end pt-2">
                <button
                  className="font-mono text-[10px] tracking-[0.05em] text-ink-faded hover:text-[#b91c1c] transition-colors"
                  onClick={() => onDelete(order.id)}
                >
                  șterge comandă
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isOpen && showDeadline && (
        <div className="text-right font-mono whitespace-nowrap pt-0.5 hidden sm:block">
          <span className={`block text-sm tracking-[-0.01em] ${isUrgent ? 'text-accent font-semibold' : 'text-ink'}`}>
            {fmtDateShort(order.deadline)}
          </span>
        </div>
      )}
    </div>
  )
}
