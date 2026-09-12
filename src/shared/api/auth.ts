import type { User } from '@/entities/auth/model/types'
import type { SignInFormData } from '@/features/auth/signin/model/schema'

export async function signInRequest({ email }: SignInFormData): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    id: 'mock-user-1',
    email,
    name: email.split('@')[0] || 'Usuário',
  }
}