import { useState, useMemo, useEffect } from 'react'
import { toast } from 'sonner'
import type { Order, OrderItem, OrderStatus } from '@/types/order'
import { DAYS_RO, MONTHS_RO, CURRENT_USER } from '@/lib/constants'
import { env } from '@/config/env'
import { dayDiff } from '@/lib/dates'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { useOrders } from '@/hooks/useOrders'
import { useDeletedOrders } from '@/hooks/useDeletedOrders'
import { useCreateOrder } from '@/hooks/useCreateOrder'
import type { NewOrderPayload } from '@/hooks/useCreateOrder'
import { useChangeStatus, useAddNote, useAddVersion, useAddItem } from '@/hooks/useOrdersMutations'
import { useDeleteOrder } from '@/hooks/useDeleteOrder'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { UserBadge } from '@/components/auth/UserBadge'
import { TodayFeed } from '@/components/views/TodayFeed'
import { AllList } from '@/components/views/AllList'
import { WeekTimeline } from '@/components/views/WeekTimeline'
import { ArchiveList } from '@/components/views/ArchiveList'
import { NewOrderChat } from '@/components/new-order/NewOrderChat'
import { DeleteConfirm } from '@/components/orders/DeleteConfirm'

type View = 'today' | 'all' | 'week' | 'archive'

function AppShell() {
  const auth = useGoogleAuth()
  const { data: fetchedOrders, isLoading, dataUpdatedAt } = useOrders(auth.getToken, auth.status === 'authenticated')
  const { data: deletedOrders } = useDeletedOrders(auth.getToken, auth.status === 'authenticated')
  const [localOrders, setLocalOrders] = useState<Order[]>([])
  const [view, setView] = useState<View>(() => {
    const saved = localStorage.getItem('cismind.view')
    return (saved === 'today' || saved === 'all' || saved === 'week' || saved === 'archive') ? saved as View : 'today'
  })
  const [openId, setOpenId] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const mutDeps = { getToken: auth.getToken }
  const createOrder = useCreateOrder({
    getToken: auth.getToken,
    onSuccess: (order) => {
      setChatOpen(false)
      setView('today')
      setOpenId(order.id)
    },
  })
  const changeStatus = useChangeStatus(mutDeps)
  const addNote = useAddNote(mutDeps)
  const addVersion = useAddVersion(mutDeps)
  const addItem = useAddItem(mutDeps)
  const deleteOrder = useDeleteOrder(mutDeps)

  useEffect(() => {
    if (fetchedOrders) setLocalOrders(fetchedOrders)
  }, [fetchedOrders])

  useEffect(() => {
    localStorage.setItem('cismind.view', view)
  }, [view])

  const orders = localOrders

  const handleChangeStatus = (id: string, newStatus: OrderStatus) => {
    changeStatus.mutate({ id, newStatus })
    if (!env.useGoogle) {
      setLocalOrders((os) => os.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
    }
  }

  const handleAddNote = (id: string, text: string) => {
    addNote.mutate({ id, text })
    if (!env.useGoogle) {
      const now = new Date().toISOString()
      setLocalOrders((os) =>
        os.map((o) =>
          o.id === id ? { ...o, notes: [...o.notes, { at: now, by: CURRENT_USER, text }] } : o,
        ),
      )
    }
  }

  const handleAddVersion = (id: string, note: string) => {
    addVersion.mutate({ id, note })
    if (!env.useGoogle) {
      const now = new Date().toISOString()
      setLocalOrders((os) =>
        os.map((o) => {
          if (o.id !== id) return o
          const nextV = (o.versions[o.versions.length - 1]?.v ?? 0) + 1
          return { ...o, versions: [...o.versions, { v: nextV, at: now, note }] }
        }),
      )
    }
  }

  const handleAddItem = (id: string, item: OrderItem) => {
    addItem.mutate({ id, item })
    if (!env.useGoogle) {
      setLocalOrders((os) => os.map((o) => (o.id === id ? { ...o, items: [...o.items, item] } : o)))
    }
  }

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id)
  }

  const confirmDelete = () => {
    if (!deleteConfirmId) return
    const id = deleteConfirmId
    const deletedAt = new Date().toISOString()

    setDeleteConfirmId(null)
    setOpenId(null)

    deleteOrder.mutate(
      { id, deletedAt },
      {
        onSuccess: () => {
          // Mock mode: remove from local
          if (!env.useGoogle) {
            setLocalOrders((os) => os.filter((o) => o.id !== id))
          }

          toast('Comandă ștearsă.', {
            action: {
              label: '↩ Anulează',
              onClick: () => {
                deleteOrder.mutate({ id, deletedAt: '' })
                if (!env.useGoogle) {
                  // Can't easily undo in mock mode
                }
              },
            },
            duration: 10_000,
          })
        },
      },
    )
  }

  const handleRestore = (id: string) => {
    deleteOrder.mutate({ id, deletedAt: '' }, {
      onSuccess: () => {
        toast.success('Comandă recuperată.')
      },
    })
  }

  const handleNewOrder = (payload: NewOrderPayload) => {
    if (env.useGoogle) {
      createOrder.mutate(payload)
    } else {
      const dlOffset: Record<string, number> = { today: 0, tomorrow: 1, d3: 3, d7: 7 }
      let dl: Date
      if (dlOffset[payload.deadline] !== undefined) {
        dl = new Date()
        dl.setDate(dl.getDate() + dlOffset[payload.deadline]!)
        dl.setHours(17, 0, 0, 0)
      } else {
        dl = new Date(payload.deadline)
      }

      const newId = String(orders.length + 1).padStart(4, '0')
      const items: OrderItem[] =
        payload.products.length > 0
          ? payload.products.map((p) => ({
              what: p.what || 'Produs',
              dim: p.dim || '—',
              material: p.material || '—',
              qty: parseInt(p.qty) || 1,
            }))
          : [{ what: 'Produs', dim: '—', material: '—', qty: 1 }]

      const newOrder: Order = {
        id: newId,
        name: payload.name || 'Comandă nouă',
        client: payload.client || '—',
        contact: payload.contact || '—',
        channel: (payload.channel || 'whatsapp') as Order['channel'],
        status: 'nou',
        deadline: dl.toISOString(),
        created: new Date().toISOString(),
        items,
        notes: [],
        versions: [],
        drive: { folderId: null, inputId: null, finalId: null },
        deletedAt: '',
      }

      setLocalOrders((os) => [newOrder, ...os])
      setChatOpen(false)
      setView('today')
      setOpenId(newId)
    }
  }

  const stats = useMemo(() => {
    const now = new Date()
    const today = orders.filter(
      (o) => dayDiff(new Date(o.deadline), now) === 0 && o.status !== 'finalizat',
    ).length
    const tomorrow = orders.filter(
      (o) => dayDiff(new Date(o.deadline), now) === 1 && o.status !== 'finalizat',
    ).length
    return { today, tomorrow }
  }, [orders])

  const now = new Date()
  const hh = now.getHours()
  const salut = hh < 11 ? 'Bună dimineața' : hh < 18 ? 'Bună ziua' : 'Bună seara'

  const syncAgo = dataUpdatedAt
    ? Math.max(0, Math.round((Date.now() - dataUpdatedAt) / 60_000))
    : null

  const cardProps = {
    onChangeStatus: handleChangeStatus,
    onAddNote: handleAddNote,
    onAddVersion: handleAddVersion,
    onAddItem: handleAddItem,
    onDelete: handleDelete,
    openId,
    setOpenId,
  }

  const viewLabels: Record<View, string> = { today: 'Azi', all: 'Toate', week: 'Săptămâna', archive: 'Arhivă' }

  return (
    <AuthGuard auth={auth}>
      <div className="mx-auto max-w-[780px] px-4 sm:px-7 pt-8 pb-30">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-6 border-b border-rule-soft pb-7 mb-7">
          <div className="font-display text-[22px] font-normal tracking-[-0.01em]">
            Cismind<em className="italic text-accent font-medium">.</em>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faded">
              {DAYS_RO[now.getDay()]}, {now.getDate()} {MONTHS_RO[now.getMonth()]}
            </div>
            <UserBadge
              name={auth.name}
              picture={auth.picture}
              email={auth.email}
              onLogout={auth.logout}
            />
          </div>
        </div>

        {/* Greeting */}
        <h1 className="font-display text-[22px] sm:text-[26px] leading-[1.25] font-normal tracking-[-0.015em] max-w-[34ch] mb-1">
          {salut}. Azi sunt{' '}
          <span className="italic text-accent font-medium">{stats.today}</span>{' '}
          {stats.today === 1 ? 'comandă' : 'comenzi'}, mâine{' '}
          <span className="italic text-accent font-medium">{stats.tomorrow}</span>.
        </h1>
        <div className="font-mono text-xs text-ink-faded tracking-[0.02em] mb-8">
          {isLoading
            ? 'se încarcă...'
            : syncAgo !== null
              ? `sync google sheets · acum ${syncAgo} min`
              : 'mock data · offline'}
        </div>

        {/* View tabs */}
        <div className="flex flex-wrap gap-0.5 mb-10 items-center">
          {(['today', 'all', 'week', 'archive'] as const).map((v) => {
            const isActive = view === v
            return (
              <button
                key={v}
                className={`font-mono text-[11px] tracking-[0.1em] uppercase pr-3.5 mr-2 sm:mr-4.5 py-2 relative transition-colors ${
                  isActive
                    ? 'text-ink after:content-[""] after:absolute after:left-0 after:right-[18px] after:bottom-0.5 after:h-px after:bg-accent'
                    : 'text-ink-faded hover:text-ink-soft'
                }`}
                onClick={() => setView(v)}
              >
                {viewLabels[v]}
              </button>
            )
          })}
          <span className="flex-1 min-w-0" />
          <button
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-paper bg-ink px-3.5 py-2.5 rounded-sm hover:bg-accent transition-colors w-full sm:w-auto mt-2 sm:mt-0"
            onClick={() => setChatOpen(true)}
          >
            <span className="mr-1.5 opacity-70">+</span> Comandă nouă
          </button>
        </div>

        {/* Views */}
        {isLoading && orders.length === 0 ? (
          <div className="py-15 text-center font-mono text-xs text-ink-faded tracking-[0.05em]">
            Se încarcă comenzile...
          </div>
        ) : (
          <>
            {view === 'today' && <TodayFeed orders={orders} {...cardProps} />}
            {view === 'all' && <AllList orders={orders} {...cardProps} />}
            {view === 'week' && (
              <WeekTimeline orders={orders} setOpenId={setOpenId} setView={setView} />
            )}
            {view === 'archive' && (
              <ArchiveList orders={deletedOrders ?? []} onRestore={handleRestore} />
            )}
          </>
        )}

        {/* New order chat */}
        {chatOpen && (
          <NewOrderChat
            onDone={handleNewOrder}
            onCancel={() => !createOrder.isPending && setChatOpen(false)}
            isCreating={createOrder.isPending}
          />
        )}

        {/* Delete confirm dialog */}
        {deleteConfirmId && (
          <DeleteConfirm
            orderId={deleteConfirmId}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteConfirmId(null)}
          />
        )}
      </div>
    </AuthGuard>
  )
}

export function App() {
  return <AppShell />
}
