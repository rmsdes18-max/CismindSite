import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { env } from '@/config/env'
import { SheetsService } from '@/lib/google/sheets'
import { DriveService } from '@/lib/google/drive'
import type { Order, OrderItem, OrderChannel } from '@/types/order'

export interface NewOrderPayload {
  client: string
  contact: string
  channel: string
  name: string
  deadline: string
  products: { what: string; dim: string; material: string; qty: string }[]
}

interface CreateOrderDeps {
  getToken: () => Promise<string>
  onSuccess?: (order: Order) => void
}

export function useCreateOrder({ getToken, onSuccess }: CreateOrderDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (payload: NewOrderPayload): Promise<Order> => {
      const sheets = new SheetsService(env.sheetsId, env.sheetsTab, getToken)
      const drive = new DriveService(env.driveRootFolderId, getToken)

      // 1. Get next ID
      const lastId = await sheets.getLastId()
      const id = String(lastId + 1)

      // 2. Build deadline
      const dlOffset: Record<string, number> = { today: 0, tomorrow: 1, d3: 3, d7: 7 }
      const dl = new Date()
      dl.setDate(dl.getDate() + (dlOffset[payload.deadline] ?? 1))
      dl.setHours(17, 0, 0, 0)

      // 3. Build items
      const items: OrderItem[] =
        payload.products.length > 0
          ? payload.products.map((p) => ({
              what: p.what || 'Produs',
              dim: p.dim || '—',
              material: p.material || '—',
              qty: parseInt(p.qty) || 1,
            }))
          : [{ what: 'Produs', dim: '—', material: '—', qty: 1 }]

      // 4. Create Drive folders
      const createdFolders: string[] = []
      try {
        const { folderId, inputId, finalId } = await drive.createOrderFolders(id, payload.name)
        createdFolders.push(folderId)

        // 5. Make Input folder shareable
        await drive.createUploadLink(inputId)

        // 6. Build Order
        const order: Order = {
          id,
          name: payload.name || 'Comandă nouă',
          client: payload.client || '—',
          contact: payload.contact || '—',
          channel: (payload.channel || 'whatsapp') as OrderChannel,
          status: 'nou',
          deadline: dl.toISOString(),
          created: new Date().toISOString(),
          items,
          notes: [],
          versions: [],
          drive: { folderId, inputId, finalId },
          deletedAt: '',
        }

        // 7. Append to Sheet
        await sheets.appendOrder(order)

        return order
      } catch (err) {
        // Rollback: delete created folders (best-effort)
        if (createdFolders.length > 0) {
          await drive.rollback(createdFolders).catch(() => {})
        }
        throw err
      }
    },
    retry: 0,
    onSuccess: (order) => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      toast.success(`Comandă #${order.id} creată`)

      // Copy upload link to clipboard
      if (order.drive.inputId) {
        const url = `https://drive.google.com/drive/folders/${order.drive.inputId}`
        navigator.clipboard.writeText(url).then(
          () => toast.info('Link upload copiat în clipboard'),
          () => {},
        )
      }

      onSuccess?.(order)
    },
    onError: () => {
      toast.error('Nu am putut crea comanda. Verifică internetul și încearcă din nou.')
    },
  })
}
