import { Bookmark } from 'lucide-react'
import { Header } from '@/widgets/header'
import { WatchlistTable } from '@/widgets/watchlist-table'

export function WatchlistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 lg:px-10">
        <section className="space-y-1">
          <div className="flex items-center gap-2">
            <Bookmark className="size-6 text-primary" />
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Watchlist
            </h1>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Gerencie seus filmes favoritos salvos na watchlist.
          </p>
        </section>

        <WatchlistTable />
      </main>
    </div>
  )
}