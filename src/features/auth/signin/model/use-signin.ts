import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { User } from '@/entities/auth/model/types'
import { useAuthStore } from '@/entities/auth/model/store'
import { signInSchema, type SignInFormData } from './schema'

interface UseSigninOptions {
  redirectTo: '/discovery'
}

async function fakeSignIn({ email }: SignInFormData): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    id: 'mock-user-1',
    email,
    name: email.split('@')[0] || 'Usuário',
  }
}

export function useSignin({ redirectTo }: UseSigninOptions) {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const user = await fakeSignIn(data)
      login(user)
      await navigate({ to: redirectTo, replace: true })
    } catch (error) {
      form.setError('root', {
        message:
          error instanceof Error ? error.message : 'Não foi possível entrar. Tente novamente.',
      })
    }
  })

  return { form, onSubmit }
}