import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_YEAR_RANGE,
  MAX_YEAR,
  MIN_RATING,
  MIN_YEAR,
  type MovieGenre,
} from '@/shared/constants/movie-constants'
import { useDebounce } from '@/shared/hooks/use-debounce'
import type { FilterState, UseMovieFiltersReturn } from './types'

const DEFAULT_FILTERS: FilterState = {
  search: '',
  cast: '',
  genres: [],
  yearRange: [MIN_YEAR, MAX_YEAR],
  ageRating: 'ALL',
  minRating: 0,
  sortBy: 'popularity',
  page: 1,
}

function parseUrlFilters(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTERS

  try {
    const params = new URLSearchParams(window.location.search)
    const search = params.get('q') || ''
    const cast = params.get('cast') || ''
    const genresParam = params.get('genres')
    const genres = genresParam ? (genresParam.split(',') as MovieGenre[]) : []
    const minYear = Number(params.get('minYear')) || MIN_YEAR
    const maxYear = Number(params.get('maxYear')) || MAX_YEAR
    const ageRating = params.get('age') || 'ALL'
    const minRating = Number(params.get('minRating')) || 0
    const sortBy = (params.get('sortBy') as FilterState['sortBy']) || 'popularity'
    const page = Number(params.get('page')) || 1

    return {
      search,
      cast,
      genres,
      yearRange: [
        Math.max(MIN_YEAR, Math.min(minYear, MAX_YEAR)),
        Math.min(MAX_YEAR, Math.max(maxYear, MIN_YEAR)),
      ],
      ageRating,
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
  if (filters.cast) params.set('cast', filters.cast)
  if (filters.genres.length > 0) params.set('genres', filters.genres.join(','))
  if (filters.yearRange[0] !== MIN_YEAR) params.set('minYear', String(filters.yearRange[0]))
  if (filters.yearRange[1] !== MAX_YEAR) params.set('maxYear', String(filters.yearRange[1]))
  if (filters.ageRating !== 'ALL') params.set('age', filters.ageRating)
  if (filters.minRating > 0) params.set('minRating', String(filters.minRating))
  if (filters.sortBy !== 'popularity') params.set('sortBy', filters.sortBy)
  if (filters.page > 1) params.set('page', String(filters.page))

  const queryString = params.toString()
  const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
  window.history.replaceState(null, '', newUrl)
}

export function useMovieFilters(): UseMovieFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(() => parseUrlFilters())

  const debouncedSearch = useDebounce(filters.search, 300)
  const debouncedCast = useDebounce(filters.cast, 300)

  // Sync to URL when key filters change
  useEffect(() => {
    syncFiltersToUrl({
      ...filters,
      search: debouncedSearch,
      cast: debouncedCast,
    })
  }, [filters, debouncedSearch, debouncedCast])

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }))
  }, [])

  const setCast = useCallback((cast: string) => {
    setFilters((prev) => ({ ...prev, cast, page: 1 }))
  }, [])

  const toggleGenre = useCallback((genre: MovieGenre) => {
    setFilters((prev) => {
      const exists = prev.genres.includes(genre)
      const genres = exists
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre]
      return { ...prev, genres, page: 1 }
    })
  }, [])

  const setYearRange = useCallback((yearRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, yearRange, page: 1 }))
  }, [])

  const setAgeRating = useCallback((ageRating: string) => {
    setFilters((prev) => ({ ...prev, ageRating, page: 1 }))
  }, [])

  const setMinRating = useCallback((minRating: number) => {
    setFilters((prev) => ({ ...prev, minRating, page: 1 }))
  }, [])

  const setSortBy = useCallback((sortBy: FilterState['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }))
  }, [])

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const applyFilters = useCallback(() => {
    // Force immediate sync or re-trigger
    syncFiltersToUrl(filters)
  }, [filters])

  const isDirty = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.cast !== '' ||
      filters.genres.length > 0 ||
      filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0] ||
      filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1] ||
      filters.ageRating !== 'ALL' ||
      filters.minRating !== MIN_RATING
    )
  }, [filters])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.cast) count++
    if (filters.genres.length > 0) count += filters.genres.length
    if (filters.yearRange[0] !== DEFAULT_YEAR_RANGE[0] || filters.yearRange[1] !== DEFAULT_YEAR_RANGE[1]) count++
    if (filters.ageRating !== 'ALL') count++
    if (filters.minRating > 0) count++
    return count
  }, [filters])

  return {
    filters,
    debouncedSearch,
    debouncedCast,
    isDirty,
    activeFilterCount,
    setSearch,
    setCast,
    toggleGenre,
    setYearRange,
    setAgeRating,
    setMinRating,
    setSortBy,
    setPage,
    resetFilters,
    applyFilters,
  }
}
