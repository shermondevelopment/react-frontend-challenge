import { AlertCircle, Film, RefreshCw, SearchX } from 'lucide-react'
import { MovieCard, MovieCardSkeleton, useMovies } from '@/entities/movie'
import type { UseMovieFiltersReturn } from '@/features/filter-movies'
import { LikeButton } from '@/features/like-movie'
import { Button } from '@/shared/ui/button'
import { MoviesListHeader } from './movies-list-header'
import { MoviesPagination } from './movies-pagination'

interface MoviesListProps {
  filtersControl: UseMovieFiltersReturn
  className?: string
}

export function MoviesList({ filtersControl, className = '' }: MoviesListProps) {
  const { filters, debouncedSearch, setPage, resetFilters } = filtersControl

  const { data, isLoading, isError, error, refetch, isFetching } = useMovies({
    page: filters.page,
    filters: {
      search: debouncedSearch,
      genreIds: filters.genreIds,
      yearRange: filters.yearRange,
      minRating: filters.minRating,
      sortBy: filters.sortBy,
    },
    sortBy: filters.sortBy,
  })

  const movies = data?.items || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1
  const currentPage = data?.page || filters.page

  return (
    <section className={`flex flex-1 flex-col gap-6 ${className}`} aria-label="Lista de filmes">
      <MoviesListHeader
        totalResults={total}
        filtersControl={filtersControl}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div
          data-testid="movies-loading-skeleton"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-12 text-center">
          <AlertCircle className="size-12 text-destructive" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">Erro ao carregar filmes</h3>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'Ocorreu um erro ao buscar o catálogo.'}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            className="gap-2 font-semibold cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
        </div>
      ) : movies.length === 0 ? (
        <div
          data-testid="movies-empty-state"
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center dark:border-white/10"
        >
          <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary dark:bg-white/5">
            <SearchX className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">Nenhum filme encontrado</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Nenhum filme corresponde aos filtros selecionados. Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </div>
          <Button
            type="button"
            variant="default"
            onClick={resetFilters}
            className="gap-2 font-semibold cursor-pointer"
          >
            <Film className="size-4" />
            Limpar todos os filtros
          </Button>
        </div>
      ) : (
        <div
          data-testid="movies-grid"
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200 ${
            isFetching ? 'opacity-70' : 'opacity-100'
          }`}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              actionSlot={<LikeButton movieId={movie.id} movieTitle={movie.title} />}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <MoviesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  )
}
