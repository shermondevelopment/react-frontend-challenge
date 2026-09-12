import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store'
import { rootRoute } from './root-route'

export const movieDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$id',
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: lazyRouteComponent(() => import('@/pages/movie-details'), 'MovieDetailsPage'),
})
