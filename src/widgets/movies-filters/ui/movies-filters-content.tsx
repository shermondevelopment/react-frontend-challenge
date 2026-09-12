import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import type { UseMovieFiltersReturn } from '@/features/filter-movies'
import {
  AgeRatingFilter,
  CastSearchInput,
  GenreChips,
  RatingSliderFilter,
  YearRangeFilter,
} from '@/features/filter-movies'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'

interface MoviesFiltersContentProps {
  filtersControl: UseMovieFiltersReturn
  onApply?: () => void
  showTitle?: boolean
}

export function MoviesFiltersContent({
  filtersControl,
  onApply,
  showTitle = true,
}: MoviesFiltersContentProps) {
  const {
    filters,
    isDirty,
    activeFilterCount,
    setCast,
    toggleGenre,
    setYearRange,
    setAgeRating,
    setMinRating,
    resetFilters,
    applyFilters,
  } = filtersControl

  const handleApply = () => {
    applyFilters()
    if (onApply) onApply()
  }

  return (
    <div className="flex flex-col gap-6">
      {showTitle && (
        <div className="flex items-center justify-between pb-2 border-b border-border dark:border-white/10">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground">Filtros Avançados</h2>
            {activeFilterCount > 0 && (
              <Badge variant="pill" className="px-1.5 py-0.2 text-[10px] font-bold">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
        </div>
      )}

      <CastSearchInput value={filters.cast} onChange={setCast} />

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground">Gênero</label>
        <GenreChips selectedGenres={filters.genres} onToggleGenre={toggleGenre} />
      </div>

      <YearRangeFilter value={filters.yearRange} onChange={setYearRange} />

      <AgeRatingFilter value={filters.ageRating} onChange={setAgeRating} />

      <RatingSliderFilter value={filters.minRating} onChange={setMinRating} />

      <div className="flex flex-col gap-2 pt-4 border-t border-border dark:border-white/10">
        <Button
          type="button"
          onClick={handleApply}
          className="h-10 w-full font-semibold shadow-md cursor-pointer"
        >
          Aplicar Filtros
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty}
          onClick={resetFilters}
          className="h-9 w-full gap-2 text-xs font-semibold cursor-pointer disabled:opacity-40"
        >
          <RotateCcw className="size-3.5" />
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}
