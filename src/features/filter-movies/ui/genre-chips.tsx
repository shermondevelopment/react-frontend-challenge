import { DEFAULT_TMDB_GENRES, useMovieGenres } from '@/entities/movie'
import { Skeleton } from '@/shared/ui/skeleton'

interface GenreChipsProps {
  selectedGenreIds: number[]
  onToggleGenre: (genreId: number) => void
  className?: string
}

const FALLBACK_GENRE_LIST = Object.entries(DEFAULT_TMDB_GENRES).map(([id, name]) => ({
  id: Number(id),
  name,
}))

export function GenreChips({
  selectedGenreIds,
  onToggleGenre,
  className = '',
}: GenreChipsProps) {
  const { data: genres, isLoading } = useMovieGenres()

  const genreList = (genres && genres.length > 0) ? genres : FALLBACK_GENRE_LIST

  if (isLoading) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {Array.from({ length: 9 }).map((_, idx) => (
          <Skeleton key={idx} className="h-7 w-20 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {genreList.map((genre) => {
        const isSelected = selectedGenreIds.includes(genre.id)
        return (
          <button
            key={genre.id}
            type="button"
            onClick={() => onToggleGenre(genre.id)}
            data-testid={`genre-chip-${genre.id}`}
            aria-pressed={isSelected}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(124,58,237,0.35)]'
                : 'border border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            {genre.name}
          </button>
        )
      })}
    </div>
  )
}
