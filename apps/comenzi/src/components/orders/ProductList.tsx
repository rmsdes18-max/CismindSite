import { useState } from 'react'
import type { OrderItem } from '@/types/order'
import { X } from 'lucide-react'

interface Props {
  items: OrderItem[]
  onEditItem?: (index: number, item: OrderItem) => void
  onDeleteItem?: (index: number) => void
}

function InlineItemEdit({
  item,
  onSave,
  onCancel,
}: {
  item: OrderItem
  onSave: (item: OrderItem) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(item)
  const set = (key: keyof OrderItem, value: string | number) =>
    setDraft((d) => ({ ...d, [key]: value }))

  return (
    <div className="grid grid-cols-2 gap-1.5 py-2">
      <input
        autoFocus
        value={draft.what}
        onChange={(e) => set('what', e.target.value)}
        placeholder="produs"
        className="col-span-full font-display text-sm py-1 px-1.5 border-b border-rule focus:border-accent bg-transparent"
      />
      <input
        value={draft.dim}
        onChange={(e) => set('dim', e.target.value)}
        placeholder="dimensiuni"
        className="font-mono text-xs py-1 px-1.5 border-b border-rule focus:border-accent bg-transparent"
      />
      <input
        value={draft.material}
        onChange={(e) => set('material', e.target.value)}
        placeholder="material"
        className="font-mono text-xs py-1 px-1.5 border-b border-rule focus:border-accent bg-transparent"
      />
      <input
        value={String(draft.qty)}
        onChange={(e) => set('qty', parseInt(e.target.value) || 0)}
        placeholder="cantitate"
        className="font-mono text-xs py-1 px-1.5 border-b border-rule focus:border-accent bg-transparent"
      />
      <div className="col-span-full flex justify-end gap-2 mt-1">
        <button
          onClick={onCancel}
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faded hover:text-ink"
        >
          anulează
        </button>
        <button
          onClick={() => { if (draft.what.trim()) onSave({ ...draft, what: draft.what.trim() }) }}
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-paper bg-ink px-2 py-1 rounded-sm hover:bg-accent"
        >
          salvează
        </button>
      </div>
    </div>
  )
}

export function ProductList({ items, onEditItem, onDeleteItem }: Props) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <ul className="list-none m-0 mb-2.5 p-0">
      {items.map((it, i) => {
        const isChecked = checkedItems.has(i)
        return (
          <li key={i} className="py-2.5 border-b border-accent-soft last:border-b-0">
            {editingIdx === i ? (
              <InlineItemEdit
                item={it}
                onSave={(newItem) => {
                  onEditItem?.(i, newItem)
                  setEditingIdx(null)
                }}
                onCancel={() => setEditingIdx(null)}
              />
            ) : (
              <div className="grid grid-cols-[20px_1fr_auto] gap-2.5 items-baseline">
                {/* Checkbox */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCheck(i) }}
                  className={`w-4 h-4 rounded-sm border mt-0.5 flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-status-finalizat border-status-finalizat text-paper'
                      : 'border-rule hover:border-ink-faded'
                  }`}
                >
                  {isChecked && <span className="text-[10px] leading-none">✓</span>}
                </button>

                <div
                  className={`min-w-0 ${onEditItem ? 'cursor-pointer hover:text-accent' : ''} ${isChecked ? 'opacity-40 line-through' : ''}`}
                  onClick={(e) => {
                    if (!onEditItem) return
                    e.stopPropagation()
                    setEditingIdx(i)
                  }}
                >
                  <div className="font-display text-sm leading-[1.3] text-ink">
                    {it.what} <span className="font-mono text-xs text-ink-faded">· {it.qty} buc</span>
                    {it.material && it.material !== '—' && (
                      <span className="font-mono text-xs text-ink-faded"> · {it.material}</span>
                    )}
                  </div>
                  {it.dim && it.dim !== '—' && (
                    <div className="font-mono text-xs text-ink-faded mt-0.5 tracking-[0.02em]">
                      {it.dim}
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  {onDeleteItem && items.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteItem(i) }}
                      className="text-ink-faded hover:text-accent transition-colors"
                      title="Șterge produs"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
