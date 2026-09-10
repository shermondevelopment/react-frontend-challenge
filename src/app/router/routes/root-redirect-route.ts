import { createRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store'
import { rootRoute } from './root-route'

export const rootRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: useAuthStore.getState().isAuthenticated ? '/discovery' : '/login' })
  },
})