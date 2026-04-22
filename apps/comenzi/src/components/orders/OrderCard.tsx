import { useState, useRef, useEffect } from 'react'
import type { Order, OrderItem, OrderStatus, OrderChannel } from '@/types/order'
import { CHANNELS } from '@/lib/constants'
import { dayDiff, fmtDateShort } from '@/lib/dates'
import { formatPhone } from '@/lib/format'
import { User, Calendar } from 'lucide-react'
import { StatusDot } from './StatusDot'
import { StatusPills } from './StatusPills'
import { ProductList } from './ProductList'
import { AddProductForm } from './AddProductForm'
import { EditableField } from './EditableField'
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
  onUpdateField?: (id: string, fields: Partial<Pick<Order, 'name' | 'client' | 'contact' | 'channel' | 'deadline'>>) => void
  onUpdateItem?: (id: string, index: number, item: OrderItem) => void
  onDeleteItem?: (id: string, index: number) => void
  onDeleteNote?: (id: string, index: number) => void
  onDelete?: (id: string) => void
  showDeadline?: boolean
}

function ClientPopover({
  order,
  onUpdateField,
  onClose,
}: {
  order: Order
  onUpdateField?: (id: string, fields: Partial<Pick<Order, 'client' | 'contact' | 'channel'>>) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 bg-paper border border-rule rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-3 min-w-[220px] z-40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faded mb-2">
        Client
      </div>
      <div className="space-y-2">
        <div>
          <span className="font-mono text-[9px] text-ink-faded uppercase tracking-[0.1em]">Nume</span>
          {onUpdateField ? (
            <EditableField
              value={order.client}
              onSave={(v) => onUpdateField(order.id, { client: v })}
              className="block font-mono text-sm text-ink"
            />
          ) : (
            <div className="font-mono text-sm text-ink">{order.client}</div>
          )}
        </div>
        <div>
          <span className="font-mono text-[9px] text-ink-faded uppercase tracking-[0.1em]">Telefon</span>
          {onUpdateField ? (
            <EditableField
              value={order.contact}
              onSave={(v) => onUpdateField(order.id, { contact: v })}
              className="block font-mono text-sm text-ink"
            />
          ) : (
            <div className="font-mono text-sm text-ink">{formatPhone(order.contact)}</div>
          )}
        </div>
        <div>
          <span className="font-mono text-[9px] text-ink-faded uppercase tracking-[0.1em]">Canal</span>
          {onUpdateField ? (
            <select
              value={order.channel}
              onChange={(e) => onUpdateField(order.id, { channel: e.target.value as OrderChannel })}
              className="block font-mono text-sm text-ink bg-transparent border-b border-rule focus:border-accent outline-none cursor-pointer w-full mt-0.5"
            >
              {Object.entries(CHANNELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          ) : (
            <div className="font-mono text-sm text-ink">{CHANNELS[order.channel]}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export function OrderCard({
  order,
  isOpen,
  onToggle,
  onChangeStatus,
  onAddNote,
  onAddVersion: _onAddVersion,
  onAddItem,
  onUpdateField,
  onUpdateItem,
  onDeleteItem,
  onDeleteNote,
  onDelete,
  showDeadline = true,
}: Props) {
  const [addingItem, setAddingItem] = useState(false)
  const [clientOpen, setClientOpen] = useState(false)

  const now = new Date()
  const diff = dayDiff(new Date(order.deadline), now)
  const isUrgent = diff <= 0 && order.status !== 'finalizat'
  const isDone = order.status === 'finalizat'

  // Collapsed summary: "Stikere Cerc · 200 buc · Adeziv" format
  const itemsSummary = order.items.map((it) => {
    const parts = [it.what, it.qty + ' buc']
    if (it.material && it.material !== '—') parts.push(it.material)
    return parts.join(' · ')
  }).join(' | ')

  return (
    <div
      className={`grid items-start gap-3.5 py-4 border-b border-rule-soft cursor-pointer transition-colors hover:bg-accent/[0.025] last:border-b-0 ${
        isOpen
          ? 'grid-cols-[1fr_20px] sm:grid-cols-[20px_1fr] bg-paper-deep -mx-4 px-4 border-b-rule'
          : 'grid-cols-[1fr_20px] sm:grid-cols-[20px_1fr_auto]'
      }`}
      onClick={() => onToggle(order.id)}
    >
      <div className="min-w-0 order-1 sm:order-2">
        {/* Title row + right-side actions */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`font-display text-[19px] font-normal tracking-[-0.01em] leading-[1.3] m-0 mb-1 ${
              isDone ? 'line-through decoration-ink-faded text-ink-faded' : ''
            }`}
          >
            <span className="font-mono text-[11px] text-ink-faded mr-2 tracking-normal font-normal align-[2px]">
              #{order.id}
            </span>
            {isOpen && onUpdateField ? (
              <EditableField
                value={order.name}
                onSave={(v) => onUpdateField(order.id, { name: v })}
                className="font-display text-[19px]"
              />
            ) : (
              order.name
            )}
          </h3>

          {/* Right side: client icon + deadline */}
          {isOpen && (
            <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
              {/* Client popover trigger */}
              <div className="relative">
                <button
                  onClick={() => setClientOpen(!clientOpen)}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-ink-faded hover:text-ink transition-colors"
                  title={`${order.client} · ${formatPhone(order.contact)}`}
                >
                  <User size={14} />
                  <span className="hidden sm:inline">{order.client.split(' ')[0]}</span>
                </button>
                {clientOpen && (
                  <ClientPopover
                    order={order}
                    onUpdateField={onUpdateField}
                    onClose={() => setClientOpen(false)}
                  />
                )}
              </div>

              {/* Deadline inline */}
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className={isUrgent ? 'text-accent' : 'text-ink-faded'} />
                {onUpdateField ? (
                  <EditableField
                    value={order.deadline.split('T')[0]!}
                    onSave={(v) => onUpdateField(order.id, { deadline: new Date(v + 'T17:00:00').toISOString() })}
                    className={`font-mono text-[11px] ${isUrgent ? 'text-accent font-semibold' : 'text-ink-faded'}`}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                ) : (
                  <span className={`font-mono text-[11px] ${isUrgent ? 'text-accent font-semibold' : 'text-ink-faded'}`}>
                    {fmtDateShort(order.deadline)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Collapsed: product summary */}
        {!isOpen && (
          <div className="font-mono text-[13px] text-ink-soft leading-6 truncate">
            {itemsSummary}
          </div>
        )}

        {/* Expanded content */}
        {isOpen && (
          <div
            className="pt-2.5 mt-2.5 border-t border-dashed border-rule"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Products */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
                  Produse
                </span>
                <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em]">
                  {order.items.length} {order.items.length === 1 ? 'produs' : 'produse'}
                </span>
              </div>
              <ProductList
                items={order.items}
                onEditItem={onUpdateItem ? (idx, item) => onUpdateItem(order.id, idx, item) : undefined}
                onDeleteItem={onDeleteItem ? (idx) => onDeleteItem(order.id, idx) : undefined}
              />
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

            <NotesBlock
              notes={order.notes}
              onAddNote={(text) => onAddNote(order.id, text)}
              onDeleteNote={onDeleteNote ? (idx) => onDeleteNote(order.id, idx) : undefined}
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

      <StatusDot
        status={order.status}
        onAdvance={() => onChangeStatus(order.id, (
          order.status === 'oferta' ? 'nou' :
          order.status === 'nou' ? 'in-lucru' :
          order.status === 'in-lucru' ? 'finalizat' : 'oferta'
        ) as OrderStatus)}
      />

      {!isOpen && showDeadline && (
        <div className="text-right font-mono whitespace-nowrap pt-0.5 hidden sm:block order-3">
          <span className={`block text-sm tracking-[-0.01em] ${isUrgent ? 'text-accent font-semibold' : 'text-ink'}`}>
            {fmtDateShort(order.deadline)}
          </span>
        </div>
      )}
    </div>
  )
}
