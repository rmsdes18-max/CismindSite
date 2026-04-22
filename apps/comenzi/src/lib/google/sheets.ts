import type { Order } from '@/types/order'
import { GoogleApiError } from './errors'
import { rowToOrder, orderToRow } from './schema'

const API = 'https://sheets.googleapis.com/v4/spreadsheets'

export class SheetsService {
  constructor(
    private sheetsId: string,
    private tabName: string,
    private getToken: () => Promise<string>,
  ) {}

  private async fetch(url: string, init?: RequestInit): Promise<Response> {
    const token = await this.getToken()
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
    if (!res.ok) {
      throw new GoogleApiError(res.status, await res.text())
    }
    return res
  }

  async listOrders(includeDeleted = false): Promise<Order[]> {
    const range = encodeURIComponent(`${this.tabName}!A2:O`)
    const res = await this.fetch(`${API}/${this.sheetsId}/values/${range}`)
    const data = await res.json()
    const values = (data.values ?? []) as string[][]
    const all = values.filter((r) => r[0]).map(rowToOrder)
    if (includeDeleted) return all.filter((o) => o.deletedAt)
    return all.filter((o) => !o.deletedAt)
  }

  async appendOrder(order: Order): Promise<void> {
    const range = encodeURIComponent(`${this.tabName}!A:O`)
    await this.fetch(
      `${API}/${this.sheetsId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        body: JSON.stringify({ values: [orderToRow(order)] }),
      },
    )
  }

  async updateRow(rowIndex: number, order: Order): Promise<void> {
    const range = encodeURIComponent(`${this.tabName}!A${rowIndex}:O${rowIndex}`)
    await this.fetch(
      `${API}/${this.sheetsId}/values/${range}?valueInputOption=RAW`,
      {
        method: 'PUT',
        body: JSON.stringify({ values: [orderToRow(order)] }),
      },
    )
  }

  async findRowIndexById(id: string): Promise<number> {
    const range = encodeURIComponent(`${this.tabName}!A:A`)
    const res = await this.fetch(`${API}/${this.sheetsId}/values/${range}`)
    const data = await res.json()
    const values = (data.values ?? []) as string[][]
    for (let i = 1; i < values.length; i++) {
      if (values[i]?.[0] === id) return i + 1
    }
    throw new Error(`Comanda #${id} nu a fost găsită în Sheet.`)
  }

  async getOrderByRowIndex(rowIndex: number): Promise<Order> {
    const range = encodeURIComponent(`${this.tabName}!A${rowIndex}:O${rowIndex}`)
    const res = await this.fetch(`${API}/${this.sheetsId}/values/${range}`)
    const data = await res.json()
    const row = data.values?.[0] as string[] | undefined
    if (!row) throw new Error(`Rândul ${rowIndex} nu există.`)
    return rowToOrder(row)
  }

  async getNextId(): Promise<string> {
    const range = encodeURIComponent(`${this.tabName}!A:A`)
    const res = await this.fetch(`${API}/${this.sheetsId}/values/${range}`)
    const data = await res.json()
    const values = (data.values ?? []) as string[][]

    // Find max numeric ID across all rows
    let max = 0
    for (let i = 1; i < values.length; i++) {
      const val = values[i]?.[0]
      if (!val) continue
      const parsed = parseInt(val, 10)
      if (!isNaN(parsed)) {
        // Old format (2604, 2605...) → ignore for new sequence, start fresh at 0001
        if (parsed > 9999) continue
        if (parsed > max) max = parsed
      }
    }

    const nextNum = max === 0 ? 1 : max + 1
    return String(nextNum).padStart(4, '0')
  }
}
