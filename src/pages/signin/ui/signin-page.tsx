import { Clapperboard } from 'lucide-react'
import { SigninForm } from '@/features/auth/signin'
import loginBackground from '@/shared/assets/cinedash-login-dark.png'

export function SigninPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background p-4 sm:p-8">
      <img src={loginBackground} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-overlay-strong" />

      <section className="relative w-full max-w-115 rounded-2xl border border-transparent bg-surface p-6 shadow-[0_16px_16px_rgb(0_0_0/0.1)] dark:border-border dark:shadow-[0_24px_24px_rgb(0_0_0/0.4)] sm:p-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-text-on-primary">
              <Clapperboard className="size-5" aria-hidden="true" />
            </span>
            <h1 className="text-[26px] font-extrabold leading-none text-text-primary">
              Cine<span className="text-primary">Dash</span>
            </h1>
          </div>
          <p className="text-base font-medium text-text-secondary">Bem-vindo de volta</p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
            Use qualquer email e senha com 6+ caracteres
          </span>
        </header>

        <SigninForm redirectTo="/discovery" />
      </section>
    </main>
  )
}