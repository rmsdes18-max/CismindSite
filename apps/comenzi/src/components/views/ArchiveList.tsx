import type { Order } from '@/types/order'
import { CHANNELS } from '@/lib/constants'
import { fmtRelative } from '@/lib/dates'

interface Props {
  orders: Order[]
  onRestore: (id: string) => void
}

export function ArchiveList({ orders, onRestore }: Props) {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime(),
  )

  if (sorted.length === 0) {
    return (
      <div className="py-15 text-center font-display italic text-lg text-ink-faded">
        Nicio comandă arhivată.
      </div>
    )
  }

  return (
    <div>
      <div className="font-mono text-[11px] text-ink-faded tracking-[0.05em] mb-5 pb-2.5 border-b border-dashed border-rule">
        Comenzile șterse pot fi recuperate oricând. Fișierele din Drive nu sunt afectate.
      </div>
      {sorted.map((o) => (
        <div
          key={o.id}
          className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 border-b border-rule-soft last:border-b-0"
        >
          <div>
            <h3 className="font-display text-[17px] font-normal tracking-[-0.01em] leading-[1.3] text-ink-faded line-through decoration-rule mb-1">
              <span className="font-mono text-[11px] text-ink-faded mr-2 tracking-normal font-normal no-underline">
                #{o.id}
              </span>
              {o.name}
            </h3>
            <div className="font-mono text-xs text-ink-faded flex flex-wrap gap-x-3.5 gap-y-0.5">
              <span>{o.client}</span>
              <span className="text-rule">·</span>
              <span>{CHANNELS[o.channel]}</span>
              <span className="text-rule">·</span>
              <span>ștearsă {fmtRelative(o.deletedAt)}</span>
            </div>
          </div>
          <button
            onClick={() => onRestore(o.id)}
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent hover:text-ink transition-colors px-3 py-2 border border-rule rounded-sm hover:border-ink"
          >
            Recuperează
          </button>
        </div>
      ))}
    </div>
  )
}
