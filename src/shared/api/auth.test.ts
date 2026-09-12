import { describe, expect, it, vi } from 'vitest'
import { signInRequest } from './auth'

describe('signInRequest', () => {
  it('maps valid credentials to an authenticated user', async () => {
    vi.useFakeTimers()

    const request = signInRequest({
      email: 'ana@example.com',
      password: '123456',
    })

    await vi.advanceTimersByTimeAsync(600)

    await expect(request).resolves.toEqual({
      id: 'mock-user-1',
      email: 'ana@example.com',
      name: 'ana',
    })

    vi.useRealTimers()
  })
})