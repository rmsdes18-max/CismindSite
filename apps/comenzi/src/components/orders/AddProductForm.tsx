import { useState } from 'react'
import type { OrderItem } from '@/types/order'

interface Props {
  onAdd: (item: OrderItem) => void
  onCancel: () => void
}

export function AddProductForm({ onAdd, onCancel }: Props) {
  const [form, setForm] = useState({ what: '', dim: '', material: '', qty: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.what.trim()) return
    onAdd({
      what: form.what.trim(),
      dim: form.dim.trim() || '—',
      material: form.material.trim() || '—',
      qty: parseInt(form.qty) || 1,
    })
  }

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2 p-3.5 bg-paper border border-dashed border-rule rounded-sm mt-2"
    >
      <input
        autoFocus
        placeholder="ce printăm (ex: Stickere rotunde)"
        value={form.what}
        onChange={(e) => set('what', e.target.value)}
        className="col-span-full font-display text-sm py-2 px-2.5 border-b border-rule focus:border-accent"
      />
      <input
        placeholder="dimensiuni (ex: 80 × 80 mm)"
        value={form.dim}
        onChange={(e) => set('dim', e.target.value)}
        className="font-display text-sm py-2 px-2.5 border-b border-rule focus:border-accent"
      />
      <input
        placeholder="material"
        value={form.material}
        onChange={(e) => set('material', e.target.value)}
        className="font-display text-sm py-2 px-2.5 border-b border-rule focus:border-accent"
      />
      <input
        placeholder="cantitate"
        value={form.qty}
        onChange={(e) => set('qty', e.target.value)}
        className="font-display text-sm py-2 px-2.5 border-b border-rule focus:border-accent"
      />
      <div className="col-span-full flex justify-end gap-3 mt-1.5">
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faded hover:text-ink"
        >
          renunță
        </button>
        <button
          type="submit"
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-paper bg-ink px-2.5 py-1.5 rounded-sm hover:bg-accent"
        >
          salvează produs ↵
        </button>
      </div>
    </form>
  )
}
