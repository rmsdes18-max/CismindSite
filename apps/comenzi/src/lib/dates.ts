import { STATUSES, DAYS_RO, MONTHS_RO } from './constants'
import type { OrderStatus } from '@/types/order'

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function dayDiff(a: Date, b: Date): number {
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / 86_400_000)
}

export function fmtTime(iso: string): string {
  const d = new Date(iso)
  return (
    d.getHours().toString().padStart(2, '0') +
    ':' +
    d.getMinutes().toString().padStart(2, '0')
  )
}

export interface DayBucket {
  key: string
  label: string
  meta: string
}

export function dayBucketLabel(iso: string, today: Date = new Date()): DayBucket {
  const diff = dayDiff(new Date(iso), today)
  if (diff < 0)
    return { key: 'intarziat', label: 'Întârziat', meta: 'deadline trecut' }
  if (diff === 0)
    return {
      key: 'azi',
      label: 'Azi',
      meta:
        DAYS_RO[today.getDay()]! +
        ', ' +
        today.getDate() +
        ' ' +
        MONTHS_RO[today.getMonth()]!,
    }
  if (diff === 1)
    return { key: 'maine', label: 'Mâine', meta: DAYS_RO[(today.getDay() + 1) % 7]! }
  if (diff <= 6) {
    const d = new Date(iso)
    const dayName = DAYS_RO[d.getDay()]!
    return {
      key: 'd-' + diff,
      label: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      meta: 'în ' + diff + ' zile',
    }
  }
  if (diff <= 13)
    return { key: 'saptviit', label: 'Săptămâna viitoare', meta: 'în ' + diff + ' zile' }
  return { key: 'later', label: 'Mai târziu', meta: 'în ' + diff + ' zile' }
}

export function statusLabel(id: OrderStatus): string {
  return STATUSES.find((s) => s.id === id)!.label
}

export function nextStatus(id: OrderStatus): OrderStatus {
  const idx = STATUSES.findIndex((s) => s.id === id)
  return STATUSES[(idx + 1) % STATUSES.length]!.id
}

export function fmtDateShort(iso: string): string {
  const d = new Date(iso)
  return d.getDate() + ' ' + MONTHS_RO[d.getMonth()]!.slice(0, 3)
}

export function fmtRelative(iso: string, today: Date = new Date()): string {
  const d = new Date(iso)
  const diff = dayDiff(d, today)
  if (diff === 0) return 'azi · ' + fmtTime(iso)
  if (diff === -1) return 'ieri · ' + fmtTime(iso)
  if (diff === 1) return 'mâine · ' + fmtTime(iso)
  if (diff < 0 && diff > -7) return 'acum ' + -diff + ' zile'
  return fmtDateShort(iso)
}
