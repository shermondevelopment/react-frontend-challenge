import type { MovieSortOption } from '@/entities/movie'

export interface FilterState {
  search: string
  genreIds: number[]
  yearRange: [number, number]
  minRating: number
  sortBy: MovieSortOption
  page: number
}

export interface UseMovieFiltersReturn {
  filters: FilterState
  debouncedSearch: string
  isDirty: boolean
  activeFilterCount: number
  setSearch: (search: string) => void
  toggleGenre: (genreId: number) => void
  setYearRange: (range: [number, number]) => void
  setMinRating: (minRating: number) => void
  setSortBy: (sortBy: MovieSortOption) => void
  setPage: (page: number) => void
  resetFilters: () => void
  applyFilters: () => void
}
