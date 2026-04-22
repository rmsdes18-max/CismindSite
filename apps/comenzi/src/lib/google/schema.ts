import type { Order, OrderItem, OrderNote, OrderVersion, OrderChannel, OrderStatus } from '@/types/order'

// Row tuple in column order A–O
export type SheetRow = [
  /* A */ id: string,
  /* B */ name: string,
  /* C */ client: string,
  /* D */ contact: string,
  /* E */ channel: string,
  /* F */ status: string,
  /* G */ deadline: string,
  /* H */ created: string,
  /* I */ items_json: string,
  /* J */ notes_json: string,
  /* K */ versions_json: string,
  /* L */ drive_folder_id: string,
  /* M */ drive_input_id: string,
  /* N */ drive_final_id: string,
  /* O */ deleted_at: string,
]

function safeParseJson<T>(s: string | undefined, fallback: T): T {
  if (!s?.trim()) return fallback
  try {
    return JSON.parse(s) as T
  } catch {
    return fallback
  }
}

export function rowToOrder(row: string[]): Order {
  return {
    id: row[0] ?? '',
    name: row[1] ?? '',
    client: row[2] ?? '',
    contact: row[3] ?? '',
    channel: (row[4] ?? 'whatsapp') as OrderChannel,
    status: (row[5] ?? 'nou') as OrderStatus,
    deadline: row[6] ?? new Date().toISOString(),
    created: row[7] ?? new Date().toISOString(),
    items: safeParseJson<OrderItem[]>(row[8], []),
    notes: safeParseJson<OrderNote[]>(row[9], []),
    versions: safeParseJson<OrderVersion[]>(row[10], []),
    drive: {
      folderId: row[11] || null,
      inputId: row[12] || null,
      finalId: row[13] || null,
    },
    deletedAt: row[14] ?? '',
  }
}

export function orderToRow(order: Order): SheetRow {
  return [
    order.id,
    order.name,
    order.client,
    order.contact,
    order.channel,
    order.status,
    order.deadline,
    order.created,
    JSON.stringify(order.items),
    JSON.stringify(order.notes),
    JSON.stringify(order.versions),
    order.drive.folderId ?? '',
    order.drive.inputId ?? '',
    order.drive.finalId ?? '',
    order.deletedAt ?? '',
  ]
}
