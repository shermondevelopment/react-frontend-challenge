import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store'
import { rootRoute } from './root-route'

export const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: lazyRouteComponent(() => import('@/pages/watchlist'), 'WatchlistPage'),
})