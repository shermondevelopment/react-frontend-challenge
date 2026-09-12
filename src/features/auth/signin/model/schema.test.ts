import { describe, expect, it } from 'vitest'
import { signInSchema } from './schema'

describe('signInSchema', () => {
  it('accepts a valid email and password', () => {
    const result = signInSchema.safeParse({
      email: 'ana@example.com',
      password: '123456',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'invalid-email',
      password: '123456',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Digite um e-mail válido.')
    }
  })

  it('rejects a short password', () => {
    const result = signInSchema.safeParse({
      email: 'ana@example.com',
      password: '123',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'A senha deve possuir pelo menos 6 caracteres.'
      )
    }
  })
})