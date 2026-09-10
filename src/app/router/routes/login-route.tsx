import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
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
  component: lazyRouteComponent(() => import('@/pages/signin'), 'SigninPage'),
})