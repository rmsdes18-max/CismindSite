import type { OrderItem } from '@/types/order'

interface Props {
  items: OrderItem[]
}

export function ProductList({ items }: Props) {
  return (
    <ul className="list-none m-0 mb-2.5 p-0">
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-[28px_1fr_auto] gap-2.5 py-2.5 border-b border-accent-soft last:border-b-0 items-baseline"
        >
          <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <div className="font-display text-sm leading-[1.3] text-ink">{it.what}</div>
            <div className="font-mono text-xs text-ink-faded mt-0.5 tracking-[0.02em]">
              {it.dim} · {it.material}
            </div>
          </div>
          <div className="font-mono text-[13px] text-ink whitespace-nowrap">× {it.qty}</div>
        </li>
      ))}
    </ul>
  )
}
