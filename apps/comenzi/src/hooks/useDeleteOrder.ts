import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { env } from '@/config/env'
import { SheetsService } from '@/lib/google/sheets'
import type { Order } from '@/types/order'

interface DeleteDeps {
  getToken: () => Promise<string>
}

export function useDeleteOrder({ getToken }: DeleteDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, deletedAt }: { id: string; deletedAt: string }) => {
      if (!env.useGoogle) return
      const svc = new SheetsService(env.sheetsId, env.sheetsTab, getToken)
      const rowIndex = await svc.findRowIndexById(id)
      const order = await svc.getOrderByRowIndex(rowIndex)
      await svc.updateRow(rowIndex, { ...order, deletedAt })
    },
    onMutate: async ({ id, deletedAt }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      await qc.cancelQueries({ queryKey: ['orders-deleted'] })
      const prev = qc.getQueryData<Order[]>(['orders'])
      const prevDeleted = qc.getQueryData<Order[]>(['orders-deleted'])

      if (deletedAt) {
        // Soft delete: remove from active, add to deleted
        qc.setQueryData<Order[]>(['orders'], (old) =>
          old?.filter((o) => o.id !== id),
        )
        const deletedOrder = prev?.find((o) => o.id === id)
        if (deletedOrder) {
          qc.setQueryData<Order[]>(['orders-deleted'], (old) =>
            [{ ...deletedOrder, deletedAt }, ...(old ?? [])],
          )
        }
      } else {
        // Restore: remove from deleted, add back to active
        const restoredOrder = prevDeleted?.find((o) => o.id === id)
        qc.setQueryData<Order[]>(['orders-deleted'], (old) =>
          old?.filter((o) => o.id !== id),
        )
        if (restoredOrder) {
          qc.setQueryData<Order[]>(['orders'], (old) =>
            [{ ...restoredOrder, deletedAt: '' }, ...(old ?? [])],
          )
        }
      }

      return { prev, prevDeleted }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['orders'], ctx.prev)
      if (ctx?.prevDeleted) qc.setQueryData(['orders-deleted'], ctx.prevDeleted)
      toast.error('Nu am putut șterge comanda. Verifică internetul.')
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['orders-deleted'] })
    },
  })
}
