import { Heart } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useLikeMovie } from '../model/use-like-movie'

export interface LikeButtonProps {
  movieId: string
  className?: string
  movieTitle?: string
}

export function LikeButton({ movieId, className = '', movieTitle }: LikeButtonProps) {
  const { isLiked, toggleLike } = useLikeMovie(movieId)

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggleLike()
      }}
      aria-label={
        isLiked
          ? `Remover ${movieTitle || 'filme'} dos favoritos`
          : `Adicionar ${movieTitle || 'filme'} aos favoritos`
      }
      aria-pressed={isLiked}
      data-testid={`like-button-${movieId}`}
      className={`size-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/60 hover:text-rose-400 focus-visible:ring-2 focus-visible:ring-rose-500 ${
        isLiked ? 'border-rose-500/50 bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 hover:text-rose-400' : ''
      } ${className}`}
    >
      <Heart
        className={`size-4 transition-all duration-200 ${
          isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'stroke-[2.2]'
        }`}
        aria-hidden="true"
      />
    </Button>
  )
}
