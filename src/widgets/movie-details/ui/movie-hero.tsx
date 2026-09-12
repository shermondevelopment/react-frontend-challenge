import { Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react'
import type { MovieDetails } from '@/entities/movie'
import { formatRating, formatReleaseDate } from '@/entities/movie'
import { WatchlistButton } from '@/features/watchlist'
import { Badge } from '@/shared/ui/badge'

interface MovieHeroProps {
  movie: MovieDetails
}

export function MovieHero({ movie }: MovieHeroProps) {
  const backdropImage = movie.backdropUrl || movie.posterUrl

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={backdropImage}
          alt={`Cena do filme ${movie.title}`}
          className="size-full object-cover object-center opacity-40 blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-6 pb-12 sm:px-8 lg:px-10">
        <Link
          to="/discovery"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition-all hover:border-white/20 hover:bg-black/60 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span>Voltar para o catálogo</span>
        </Link>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end">
          <div className="group relative aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl ring-1 ring-white/15 sm:w-64 lg:w-72">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 text-white">
            {movie.tagline && (
              <p className="text-sm font-semibold tracking-wide text-primary">
                "{movie.tagline}"
              </p>
            )}

            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-foreground dark:text-white">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-sm font-medium text-muted-foreground">
                  Título original: <span className="italic">{movie.originalTitle}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
              {movie.certification && (
                <span className="rounded-md border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 font-bold text-amber-400">
                  {movie.certification}
                </span>
              )}

              <div className="flex items-center gap-1.5 rounded-md border border-white/15 bg-black/40 px-2.5 py-0.5 text-white backdrop-blur-md">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{formatRating(movie.rating)}</span>
                <span className="text-[11px] text-white/60">({movie.voteCount.toLocaleString()} votos)</span>
              </div>

              {movie.durationFormatted && (
                <div className="flex items-center gap-1.5 rounded-md border border-white/15 bg-black/40 px-2.5 py-0.5 text-white/90 backdrop-blur-md">
                  <Clock className="size-3.5 text-white/70" />
                  <span>{movie.durationFormatted}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 rounded-md border border-white/15 bg-black/40 px-2.5 py-0.5 text-white/90 backdrop-blur-md">
                <Calendar className="size-3.5 text-white/70" />
                <span>{formatReleaseDate(movie.releaseDate)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {movie.genreNames.map((genre) => (
                <Badge
                  key={genre}
                  variant="pill"
                  className="px-3 py-1 text-xs font-semibold shadow-xs"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="pt-3">
              <WatchlistButton
                movie={movie}
                showLabel={true}
                className="h-11 px-5 text-sm shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
