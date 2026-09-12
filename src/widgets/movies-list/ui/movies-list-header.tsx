import type { UseMovieFiltersReturn } from '@/features/filter-movies'
import { MovieSearchInput, SortSelect } from '@/features/filter-movies'
import { MobileFiltersTrigger } from '@/widgets/movies-filters'

interface MoviesListHeaderProps {
  totalResults: number
  filtersControl: UseMovieFiltersReturn
  isLoading?: boolean
}

export function MoviesListHeader({
  totalResults,
  filtersControl,
  isLoading,
}: MoviesListHeaderProps) {
  const { filters, setSearch, setSortBy } = filtersControl

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Filmes Disponíveis
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {isLoading
              ? 'Buscando catálogo...'
              : `Exibindo ${totalResults} ${totalResults === 1 ? 'filme encontrado' : 'filmes encontrados'} com base em seus filtros`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <MovieSearchInput value={filters.search} onChange={setSearch} />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <MobileFiltersTrigger filtersControl={filtersControl} />
          <SortSelect value={filters.sortBy} onChange={setSortBy} />
        </div>
      </div>
    </div>
  )
}
