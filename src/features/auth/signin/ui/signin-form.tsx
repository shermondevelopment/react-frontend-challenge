import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useSignin } from '../model/use-signin'

interface SigninFormProps {
  redirectTo: '/discovery'
}

export function SigninForm({ redirectTo }: SigninFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { form, onSubmit } = useSignin({ redirectTo })
  const emailError = form.formState.errors.email
  const passwordError = form.formState.errors.password

  return (
    <form className="mt-8" onSubmit={onSubmit} noValidate>
      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-text-primary">
            E-mail
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="exemplo@email.com"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'email-error' : undefined}
              className="h-12 rounded-lg border-border bg-input py-1 pl-11 text-sm text-text-primary placeholder:text-(--input-placeholder)"
              {...form.register('email')}
            />
          </div>
          <p
            id="email-error"
            className="min-h-5 text-sm text-error"
            role={emailError ? 'alert' : undefined}
          >
            {emailError?.message}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-text-primary">
            Senha
          </label>
          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••••••"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'password-error' : undefined}
              className="h-12 rounded-lg border-border bg-input py-1 pr-11 pl-11 text-sm text-text-primary placeholder:text-(--input-placeholder)"
              {...form.register('password')}
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 grid size-4.5 -translate-y-1/2 place-items-center text-text-secondary"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
          <p
            id="password-error"
            className="min-h-5 text-sm text-error"
            role={passwordError ? 'alert' : undefined}
          >
            {passwordError?.message}
          </p>
        </div>
      </div>

      <p className="min-h-5 pt-2 text-sm text-error" role="alert">
        {form.formState.errors.root?.message}
      </p>

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-lg text-[15px]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </form>
  )
}