import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/entities/auth/model/store'
import { signInRequest } from '@/shared/api/auth'
import { signInSchema, type SignInFormData } from './schema'

interface UseSigninOptions {
  redirectTo: '/discovery'
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
      const user = await signInRequest(data)
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