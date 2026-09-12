import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from '@/entities/auth/model/store'
import type { User } from '@/entities/auth/model/types'
import { watchlistRoute } from './watchlist-route'

const user: User = {
  id: 'user-1',
  email: 'ana@example.com',
  name: 'ana',
}

describe('watchlistRoute', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('redirects unauthenticated users to login', () => {
    const beforeLoad = watchlistRoute.options.beforeLoad

    expect(beforeLoad).toBeDefined()

    try {
      beforeLoad?.({} as never)
      throw new Error('Expected beforeLoad to redirect')
    } catch (error) {
      expect(error).toMatchObject({ options: { to: '/login' } })
    }
  })

  it('allows authenticated users', () => {
    useAuthStore.getState().login(user)

    expect(() => watchlistRoute.options.beforeLoad?.({} as never)).not.toThrow()
  })
})