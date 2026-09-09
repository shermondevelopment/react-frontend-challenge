import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './root-route'

export const rootRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})