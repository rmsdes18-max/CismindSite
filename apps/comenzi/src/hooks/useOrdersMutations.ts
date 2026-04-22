import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { env } from '@/config/env'
import { CURRENT_USER } from '@/lib/constants'
import { SheetsService } from '@/lib/google/sheets'
import type { Order, OrderItem, OrderStatus } from '@/types/order'

interface MutationDeps {
  getToken: () => Promise<string>
}

function createSheetsService(getToken: () => Promise<string>) {
  return new SheetsService(env.sheetsId, env.sheetsTab, getToken)
}

// ─── Change Status ──────────────────────────────────────────────

export function useChangeStatus({ getToken }: MutationDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: OrderStatus }) => {
      if (!env.useGoogle) return
      const svc = createSheetsService(getToken)
      const rowIndex = await svc.findRowIndexById(id)
      const order = await svc.getOrderByRowIndex(rowIndex)
      await svc.updateRow(rowIndex, { ...order, status: newStatus })
    },
    onMutate: async ({ id, newStatus }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      const prev = qc.getQueryData<Order[]>(['orders'])
      qc.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['orders'], ctx.prev)
      toast.error('Nu am putut schimba statusul. Verifică internetul.')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}

// ─── Add Note ───────────────────────────────────────────────────

export function useAddNote({ getToken }: MutationDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      if (!env.useGoogle) return
      const svc = createSheetsService(getToken)
      const rowIndex = await svc.findRowIndexById(id)
      const order = await svc.getOrderByRowIndex(rowIndex)
      const note = { at: new Date().toISOString(), by: CURRENT_USER, text }
      await svc.updateRow(rowIndex, { ...order, notes: [...order.notes, note] })
    },
    onMutate: async ({ id, text }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      const prev = qc.getQueryData<Order[]>(['orders'])
      const note = { at: new Date().toISOString(), by: CURRENT_USER, text }
      qc.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, notes: [...o.notes, note] } : o)),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['orders'], ctx.prev)
      toast.error('Nu am putut salva nota. Verifică internetul.')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}

// ─── Add Version ────────────────────────────────────────────────

export function useAddVersion({ getToken }: MutationDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      if (!env.useGoogle) return
      const svc = createSheetsService(getToken)
      const rowIndex = await svc.findRowIndexById(id)
      const order = await svc.getOrderByRowIndex(rowIndex)
      const nextV = (order.versions[order.versions.length - 1]?.v ?? 0) + 1
      const version = { v: nextV, at: new Date().toISOString(), note }
      await svc.updateRow(rowIndex, { ...order, versions: [...order.versions, version] })
    },
    onMutate: async ({ id, note }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      const prev = qc.getQueryData<Order[]>(['orders'])
      qc.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => {
          if (o.id !== id) return o
          const nextV = (o.versions[o.versions.length - 1]?.v ?? 0) + 1
          return { ...o, versions: [...o.versions, { v: nextV, at: new Date().toISOString(), note }] }
        }),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['orders'], ctx.prev)
      toast.error('Nu am putut salva versiunea. Verifică internetul.')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}

// ─── Add Item ───────────────────────────────────────────────────

export function useAddItem({ getToken }: MutationDeps) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, item }: { id: string; item: OrderItem }) => {
      if (!env.useGoogle) return
      const svc = createSheetsService(getToken)
      const rowIndex = await svc.findRowIndexById(id)
      const order = await svc.getOrderByRowIndex(rowIndex)
      await svc.updateRow(rowIndex, { ...order, items: [...order.items, item] })
    },
    onMutate: async ({ id, item }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      const prev = qc.getQueryData<Order[]>(['orders'])
      qc.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, items: [...o.items, item] } : o)),
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['orders'], ctx.prev)
      toast.error('Nu am putut adăuga produsul. Verifică internetul.')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}
