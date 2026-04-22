import { useState } from 'react'
import type { Order } from '@/types/order'
import { DAYS_RO_SHORT, MONTHS_RO } from '@/lib/constants'
import { dayDiff, fmtTime } from '@/lib/dates'

const statusDotColor: Record<string, string> = {
  oferta:    'bg-transparent border border-amber',
  nou:       'bg-amber',
  'in-lucru': 'bg-accent',
  finalizat: 'bg-green opacity-60',
}

interface Props {
  orders: Order[]
  setOpenId: (id: string) => void
  setView: (view: 'today' | 'all' | 'week') => void
}

export function WeekTimeline({ orders, setOpenId, setView }: Props) {
  const [offset, setOffset] = useState(0)

  const today = new Date()
  const base = new Date(today)
  base.setDate(base.getDate() + offset * 7)
  const dow = base.getDay()
  const diffToMonday = dow === 0 ? -6 : 1 - dow
  const monday = new Date(base)
  monday.setDate(base.getDate() + diffToMonday)
  monday.setHours(0, 0, 0, 0)

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })

  const ordersByDay = days.map((day) =>
    orders
      .filter((o) => {
        const od = new Date(o.deadline)
        return (
          od.getFullYear() === day.getFullYear() &&
          od.getMonth() === day.getMonth() &&
          od.getDate() === day.getDate()
        )
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
  )

  const handleClick = (orderId: string) => {
    setOpenId(orderId)
    setView('today')
  }

  const weekLabel =
    days[0]!.getDate() +
    ' ' +
    MONTHS_RO[days[0]!.getMonth()]!.slice(0, 3) +
    ' – ' +
    days[6]!.getDate() +
    ' ' +
    MONTHS_RO[days[6]!.getMonth()]!.slice(0, 3)

  const totalWeek = orders.filter((o) => {
    const od = new Date(o.deadline)
    return od >= days[0]! && od < new Date(days[6]!.getTime() + 86_400_000)
  }).length

  const weekOffsetLabel =
    offset === 0
      ? 'săptămâna curentă'
      : offset === -1
        ? 'săptămâna trecută'
        : offset === 1
          ? 'săptămâna viitoare'
          : offset < 0
            ? 'acum ' + -offset + ' săptămâni'
            : 'peste ' + offset + ' săptămâni'

  return (
    <div>
      {/* Navigation */}
      <div className="flex items-center gap-3.5 mb-2 pb-3.5 border-b border-dashed border-rule">
        <button
          className="w-9 h-9 border border-rule rounded-sm font-mono text-base text-ink flex items-center justify-center hover:border-ink hover:bg-paper-deep transition-all"
          onClick={() => setOffset(offset - 1)}
          title="săptămâna precedentă"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="font-display text-lg italic tracking-[-0.01em]">{weekLabel}</div>
          <div className="font-mono text-[11px] text-ink-faded tracking-[0.03em] mt-0.5">
            {weekOffsetLabel} · {totalWeek} {totalWeek === 1 ? 'comandă' : 'comenzi'}
          </div>
        </div>
        <button
          className="w-9 h-9 border border-rule rounded-sm font-mono text-base text-ink flex items-center justify-center hover:border-ink hover:bg-paper-deep transition-all"
          onClick={() => setOffset(offset + 1)}
          title="săptămâna următoare"
        >
          →
        </button>
        {offset !== 0 && (
          <button
            className="font-mono text-[10px] tracking-[0.1em] uppercase text-paper bg-accent px-3 py-2 rounded-sm hover:bg-ink"
            onClick={() => setOffset(0)}
          >
            azi
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 mt-5 border-t border-rule border-l border-rule-soft">
        {days.map((day, i) => {
          const isToday = dayDiff(day, today) === 0
          const dDow = day.getDay()
          const isWeekend = dDow === 0 || dDow === 6
          const items = ordersByDay[i]!
          return (
            <div
              key={i}
              className={`border-r border-b border-rule-soft min-h-[360px] p-2.5 relative ${
                isToday ? 'bg-accent/[0.035]' : isWeekend ? 'bg-black/[0.015]' : ''
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faded mb-1">
                {DAYS_RO_SHORT[dDow]}
              </div>
              <div
                className={`font-display text-[22px] font-normal tracking-[-0.02em] leading-none mb-4 ${
                  isToday ? 'text-accent italic' : ''
                }`}
              >
                {day.getDate()}
              </div>
              {items.map((o) => (
                <div
                  key={o.id}
                  className="py-2 border-t border-dashed border-rule font-display text-[13px] leading-[1.25] cursor-pointer hover:text-accent transition-colors"
                  onClick={() => handleClick(o.id)}
                >
                  <span className="block font-mono text-[10px] text-ink-faded mb-0.5 tracking-[0.05em]">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-[1px] ${
                        statusDotColor[o.status] ?? 'bg-ink-faded'
                      }`}
                    />
                    {fmtTime(o.deadline)}
                  </span>
                  {o.name}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <div className="mt-4 font-mono text-[10px] text-ink-faded tracking-[0.08em] uppercase">
        Click pe o comandă → deschide în "Azi"
      </div>
    </div>
  )
}
