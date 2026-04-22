import { useQuery } from '@tanstack/react-query'
import { env } from '@/config/env'
import { SheetsService } from '@/lib/google/sheets'
import { MOCK_ORDERS } from '@/lib/mock-data'
import type { Order } from '@/types/order'

export function useOrders(getToken: () => Promise<string>, isAuthenticated: boolean) {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!env.useGoogle) return MOCK_ORDERS
      const svc = new SheetsService(env.sheetsId, env.sheetsTab, getToken)
      return svc.listOrders()
    },
    refetchInterval: 30_000,
    staleTime: 10_000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    enabled: !env.useGoogle || isAuthenticated,
  })
}
