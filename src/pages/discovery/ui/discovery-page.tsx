import { useLogout } from '@/features/auth/logout'
import { Button } from '@/shared/ui/button'

export function DiscoveryPage() {
  const { handleLogout } = useLogout()

  return (
    <main className="relative grid min-h-screen place-items-center p-8">
      <Button variant="link" className="absolute top-4 right-4" onClick={handleLogout}>
        Deslogar
      </Button>
      <section className="hello-world">
        <span className="hello-world__eyebrow">Vite setup</span>
      </section>
    </main>
  )
}