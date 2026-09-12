import { MOVIE_GENRES, type MovieGenre } from '@/shared/constants/movie-constants'

interface GenreChipsProps {
  selectedGenres: MovieGenre[]
  onToggleGenre: (genre: MovieGenre) => void
  className?: string
}

export function GenreChips({ selectedGenres, onToggleGenre, className = '' }: GenreChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {MOVIE_GENRES.map((genre) => {
        const isSelected = selectedGenres.includes(genre)
        return (
          <button
            key={genre}
            type="button"
            onClick={() => onToggleGenre(genre)}
            data-testid={`genre-chip-${genre}`}
            aria-pressed={isSelected}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(124,58,237,0.35)]'
                : 'border border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            {genre}
          </button>
        )
      })}
    </div>
  )
}
