import type { SignInFormData } from '../model/schema'

export interface SignInResponse {
  accessToken?: string
}

export async function signIn(data: SignInFormData): Promise<SignInResponse> {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Não foi possível entrar. Verifique suas credenciais.')
  }

  if (response.status === 204) {
    return {}
  }

  return response.json() as Promise<SignInResponse>
}