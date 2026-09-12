import { Check, Plus } from 'lucide-react'
import { toast } from 'sonner'
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
        if (isFavorite) {
          toast.info(`"${movie.title}" removido da watchlist.`)
        } else {
          toast.success(`"${movie.title}" adicionado à watchlist com sucesso!`)
        }
        toggle(movie)
      }}
      aria-label={
        isFavorite
          ? `Remover ${movie.title} da watchlist`
          : `Adicionar ${movie.title} à watchlist`
      }
      aria-pressed={isFavorite}
      data-testid={`watchlist-button-${movie.id}`}
      className={`rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/60 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary ${
        isFavorite
          ? 'border-primary/50 bg-primary/25 text-primary hover:bg-primary/35 hover:text-primary'
          : ''
      } ${!showLabel ? 'size-8' : 'px-3 py-1.5 gap-2'} ${className}`}
    >
      {isFavorite ? (
        <Check className="size-4 text-primary stroke-[2.5]" aria-hidden="true" />
      ) : (
        <Plus className="size-4 stroke-[2.5]" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold">
          {isFavorite ? 'Na Watchlist' : 'Adicionar à Watchlist'}
        </span>
      )}
    </Button>
  )
}
