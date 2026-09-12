import { Link } from '@tanstack/react-router'
import { Bookmark, Film } from 'lucide-react'
import { MovieCard, useMovies } from '@/entities/movie'
import { LikeButton, useLikedMoviesStore } from '@/features/like-movie'
import { Header } from '@/widgets/header'

export function WatchlistPage() {
  const likedMovieIds = useLikedMoviesStore((state) => state.likedMovieIds)
  const { data, isLoading } = useMovies({ pageSize: 100 })

  const likedMovies = (data?.items || []).filter((movie) =>
    likedMovieIds.includes(movie.id)
  )

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
            {likedMovies.length === 0
              ? 'Seus filmes salvos aparecerão aqui.'
              : `Você tem ${likedMovies.length} ${
                  likedMovies.length === 1 ? 'filme salvo' : 'filmes salvos'
                } na sua lista.`}
          </p>
        </section>

        {!isLoading && likedMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center dark:border-white/10">
            <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary dark:bg-white/5">
              <Film className="size-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">Nenhum filme salvo ainda</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Explore o catálogo e clique no ícone de coração para salvar filmes na sua watchlist.
              </p>
            </div>
            <Link
              to="/discovery"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {likedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                actionSlot={<LikeButton movieId={movie.id} movieTitle={movie.title} />}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}