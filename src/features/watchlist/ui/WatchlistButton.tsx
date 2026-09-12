import { Heart } from 'lucide-react'
import type { Movie } from '@/entities/movie'
import { Button } from '@/shared/ui/button'
import { useWatchlistStore } from '../model/store'

export interface WatchlistButtonProps {
  movie: Movie
  className?: string
  showLabel?: boolean
}

export function WatchlistButton({
  movie,
  className = '',
  showLabel = false,
}: WatchlistButtonProps) {
  const isFavorite = useWatchlistStore((state) => state.isFavorite(movie.id))
  const toggle = useWatchlistStore((state) => state.toggle)

  return (
    <Button
      type="button"
      size={showLabel ? 'default' : 'icon-sm'}
      variant="ghost"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggle(movie)
      }}
      aria-label={
        isFavorite
          ? `Remover ${movie.title} dos favoritos`
          : `Adicionar ${movie.title} aos favoritos`
      }
      aria-pressed={isFavorite}
      data-testid={`watchlist-button-${movie.id}`}
      className={`rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/60 hover:text-rose-400 focus-visible:ring-2 focus-visible:ring-rose-500 ${
        isFavorite
          ? 'border-rose-500/50 bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 hover:text-rose-400'
          : ''
      } ${!showLabel ? 'size-8' : 'px-3 py-1.5 gap-2'} ${className}`}
    >
      <Heart
        className={`size-4 transition-all duration-200 ${
          isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'stroke-[2.2]'
        }`}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-xs font-semibold">
          {isFavorite ? 'Na Watchlist' : 'Adicionar à Watchlist'}
        </span>
      )}
    </Button>
  )
}
