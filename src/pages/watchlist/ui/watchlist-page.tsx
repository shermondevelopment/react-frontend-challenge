import { Header } from '@/widgets/header'

export function WatchlistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-10">
        <section className="space-y-2">
          <h1 className="text-2xl font-extrabold text-text-primary">Watchlist</h1>
          <p className="text-sm font-medium text-text-secondary">
            Seus filmes salvos aparecerão aqui.
          </p>
        </section>
      </main>
    </div>
  )
}