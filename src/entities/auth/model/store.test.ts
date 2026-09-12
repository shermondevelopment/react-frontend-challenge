import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from './store'
import type { User } from './types'

const user: User = {
  id: 'user-1',
  email: 'ana@example.com',
  name: 'ana',
}

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('authenticates the user on login', () => {
    useAuthStore.getState().login(user)

    expect(useAuthStore.getState().user).toEqual(user)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('clears authentication on logout', () => {
    useAuthStore.getState().login(user)
    useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('persists the auth state using auth-storage', () => {
    useAuthStore.getState().login(user)

    expect(localStorage.getItem('auth-storage')).toContain('ana@example.com')
  })
})