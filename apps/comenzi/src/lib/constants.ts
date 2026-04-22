import type { OrderStatus, OrderChannel } from '@/types/order'

export const STATUSES: { id: OrderStatus; label: string; short: string }[] = [
  { id: 'oferta',    label: 'Ofertă',    short: 'of' },
  { id: 'nou',       label: 'Nou',       short: 'nou' },
  { id: 'in-lucru',  label: 'În lucru',  short: 'lucru' },
  { id: 'finalizat', label: 'Finalizat', short: 'gata' },
]

export const CHANNELS: Record<OrderChannel, string> = {
  whatsapp: 'WhatsApp',
  mail: 'mail',
  telefon: 'telefon',
}

export const PEOPLE = ['Andrei', 'Mihaela', 'Radu'] as const

export const CURRENT_USER = 'Andrei'

export const FOLDER_LABELS = {
  input: 'Primit',
  final: 'De printat',
} as const

export const DAYS_RO = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă']
export const DAYS_RO_SHORT = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm']
export const MONTHS_RO = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
]
