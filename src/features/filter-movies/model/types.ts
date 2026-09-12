import type { MovieGenre, MovieSortOption } from '@/entities/movie'

export interface FilterState {
  search: string
  cast: string
  genres: MovieGenre[]
  yearRange: [number, number]
  ageRating: string
  minRating: number
  sortBy: MovieSortOption
  page: number
}

export interface UseMovieFiltersReturn {
  filters: FilterState
  debouncedSearch: string
  debouncedCast: string
  isDirty: boolean
  activeFilterCount: number
  setSearch: (search: string) => void
  setCast: (cast: string) => void
  toggleGenre: (genre: MovieGenre) => void
  setYearRange: (range: [number, number]) => void
  setAgeRating: (ageRating: string) => void
  setMinRating: (minRating: number) => void
  setSortBy: (sortBy: MovieSortOption) => void
  setPage: (page: number) => void
  resetFilters: () => void
  applyFilters: () => void
}
