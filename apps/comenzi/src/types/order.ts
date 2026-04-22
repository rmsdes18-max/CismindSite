export interface OrderItem {
  what: string
  dim: string
  material: string
  qty: number
}

export interface OrderNote {
  at: string // ISO date
  by: string
  text: string
}

export interface OrderVersion {
  v: number
  at: string // ISO date
  note: string
}

export interface OrderDrive {
  folderId: string | null
  inputId: string | null
  finalId: string | null
}

export type OrderStatus = 'oferta' | 'nou' | 'in-lucru' | 'finalizat'
export type OrderChannel = 'whatsapp' | 'mail' | 'telefon'

export interface Order {
  id: string
  name: string
  client: string
  contact: string
  channel: OrderChannel
  status: OrderStatus
  deadline: string // ISO date
  created: string  // ISO date
  items: OrderItem[]
  notes: OrderNote[]
  versions: OrderVersion[]
  drive: OrderDrive
  deletedAt: string // ISO date or '' if not deleted
}
