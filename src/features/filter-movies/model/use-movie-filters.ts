import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MovieSortOption } from '@/entities/movie'
import {
  DEFAULT_YEAR_RANGE,
  MAX_YEAR,
  MIN_RATING,
  MIN_YEAR,
} from '@/shared/constants/movie-constants'
import { useDebounce } from '@/shared/hooks/use-debounce'
import type { FilterState, UseMovieFiltersReturn } from './types'

const DEFAULT_FILTERS: FilterState = {
  search: '',
  genreIds: [],
  yearRange: DEFAULT_YEAR_RANGE,
  minRating: 0,
  sortBy: 'popularity.desc',
  page: 1,
}

function parseGenreIds(raw: string | null): number[] {
  if (!raw) return []
  try {
    const decoded = raw.startsWith('%') ? decodeURIComponent(raw) : raw
    const parsed = JSON.parse(decoded)
    if (Array.isArray(parsed)) {
      return parsed.map((id) => Number(id)).filter((id) => !isNaN(id) && id > 0)
    }
  } catch (error) {
    void error
  }

  return raw
    .split(/[,|]/)
    .map((id) => Number(id.trim().replace(/['"[\]]/g, '')))
    .filter((id) => !isNaN(id) && id > 0)
}

function parseUrlFilters(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTERS

  try {
    const params = new URLSearchParams(window.location.search)
    const search = params.get('q') || ''
    const rawGenres = params.get('genreIds') || params.get('genres')
    const genreIds = parseGenreIds(rawGenres)
    const minYear = Number(params.get('minYear')) || DEFAULT_YEAR_RANGE[0]
    const maxYear = Number(params.get('maxYear')) || DEFAULT_YEAR_RANGE[1]
    const minRating = Number(params.get('minRating')) || 0
    const sortBy = (params.get('sortBy') as MovieSortOption) || 'popularity.desc'
    const page = Number(params.get('page')) || 1

    return {
      search,
      genreIds,
      yearRange: [
        Math.max(MIN_YEAR, Math.min(minYear, MAX_YEAR)),
        Math.min(MAX_YEAR, Math.max(maxYear, MIN_YEAR)),
      ],
      minRating: Math.max(0, Math.min(minRating, 10)),
      sortBy,
      page: Math.max(1, page),
    }
  } catch {
    return DEFAULT_FILTERS
  }
}

function syncFiltersToUrl(filters: FilterState) {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams()

  if (filters.search) params.set('q', filters.search)
  if (filters.genreIds.length > 0) {
    params.set('genreIds', JSON.stringify(filters.genreIds.map(String)))
  }
  if (filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0])
    params.set('minYear', String(filters.yearRange[0]))
  if (filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1])
    params.set('maxYear', String(filters.yearRange[1]))
  if (filters.minRating > 0) params.set('minRating', String(filters.minRating))
  if (filters.sortBy !== 'popularity.desc') params.set('sortBy', filters.sortBy)
  if (filters.page > 1) params.set('page', String(filters.page))

  const queryString = params.toString()
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname
  window.history.replaceState(null, '', newUrl)
}

export function useMovieFilters(): UseMovieFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(() => parseUrlFilters())

  const debouncedSearch = useDebounce(filters.search, 400)

  useEffect(() => {
    syncFiltersToUrl({
      ...filters,
      search: debouncedSearch,
    })
  }, [filters, debouncedSearch])

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }))
  }, [])

  const toggleGenre = useCallback((genreId: number) => {
    setFilters((prev) => {
      const exists = prev.genreIds.includes(genreId)
      const genreIds = exists
        ? prev.genreIds.filter((id) => id !== genreId)
        : [...prev.genreIds, genreId]
      return { ...prev, genreIds, page: 1 }
    })
  }, [])

  const setYearRange = useCallback((yearRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, yearRange, page: 1 }))
  }, [])

  const setMinRating = useCallback((minRating: number) => {
    setFilters((prev) => ({ ...prev, minRating, page: 1 }))
  }, [])

  const setSortBy = useCallback((sortBy: MovieSortOption) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }))
  }, [])

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const applyFilters = useCallback(() => {
    syncFiltersToUrl(filters)
  }, [filters])

  const isDirty = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.genreIds.length > 0 ||
      filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0] ||
      filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1] ||
      filters.minRating !== MIN_RATING
    )
  }, [filters])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.genreIds.length > 0) count += filters.genreIds.length
    if (
      filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0] ||
      filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1]
    )
      count++
    if (filters.minRating > 0) count++
    return count
  }, [filters])

  return {
    filters,
    debouncedSearch,
    isDirty,
    activeFilterCount,
    setSearch,
    toggleGenre,
    setYearRange,
    setMinRating,
    setSortBy,
    setPage,
    resetFilters,
    applyFilters,
  }
}
