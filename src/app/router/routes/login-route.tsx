import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store'
import { rootRoute } from './root-route'

export interface LoginSearch {
  redirect?: string
}

function validateLoginSearch(search: Record<string, unknown>): LoginSearch {
  return {
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: validateLoginSearch,
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/discovery' })
    }
  },
  component: lazyRouteComponent(() => import('@/pages/signin'), 'SigninPage'),
})