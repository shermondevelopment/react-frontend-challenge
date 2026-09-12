import type { ReactNode } from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { formatRating } from '../model/movie-helpers'
import type { Movie } from '../model/types'

export interface MovieCardProps {
  movie: Movie
  actionSlot?: ReactNode
  className?: string
  onClick?: () => void
}

export function MovieCard({ movie, actionSlot, className = '', onClick }: MovieCardProps) {
  const primaryGenre = movie.genreNames[0] || 'Filme'

  return (
    <article
      data-testid={`movie-card-${movie.id}`}
      className={`group relative flex flex-col overflow-hidden transition-transform duration-300 ${className}`}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-md ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-xl group-hover:ring-primary/40">
        <img
          src={movie.posterUrl}
          alt={`Poster do filme ${movie.title}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

        {actionSlot && (
          <div className="absolute right-3 top-3 z-10 transition-transform active:scale-90">
            {actionSlot}
          </div>
        )}

        {movie.year > 0 && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
            <span className="rounded-md border border-white/15 bg-black/50 px-2 py-0.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              {movie.year}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-3">
        <h3
          title={movie.title}
          className="truncate text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
        >
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <Badge
            variant="pill"
            className="truncate px-2 py-0.5 text-[11px] font-medium tracking-wide"
          >
            {primaryGenre}
          </Badge>

          <div className="flex items-center gap-1 font-semibold text-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>{formatRating(movie.rating)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
