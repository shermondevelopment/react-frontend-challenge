import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from '../api/signin'
import { signInSchema, type SignInFormData } from './schema'

export function useSignin() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn(data)
    } catch (error) {
      form.setError('root', {
        message:
          error instanceof Error ? error.message : 'Não foi possível entrar. Tente novamente.',
      })
    }
  })

  return { form, onSubmit }
}