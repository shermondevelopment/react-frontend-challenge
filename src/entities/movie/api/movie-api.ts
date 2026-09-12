import { DEFAULT_PAGE_SIZE } from '@/shared/constants/movie-constants'
import type { GetMoviesParams, GetMoviesResponse, Movie } from '../model/types'
import { MOCK_MOVIES } from './mock-movies-data'

export const movieApi = {
  async getMovies(params: GetMoviesParams = {}): Promise<GetMoviesResponse> {
    const {
      page = 1,
      pageSize = DEFAULT_PAGE_SIZE,
      filters = {},
      sortBy = 'popularity',
    } = params

    await new Promise((resolve) => setTimeout(resolve, 150))

    let filtered = [...MOCK_MOVIES]

    if (filters.search && filters.search.trim() !== '') {
      const normalizedSearch = filters.search.trim().toLowerCase()
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedSearch) ||
          movie.originalTitle?.toLowerCase().includes(normalizedSearch)
      )
    }

    if (filters.cast && filters.cast.trim() !== '') {
      const normalizedCast = filters.cast.trim().toLowerCase()
      filtered = filtered.filter((movie) =>
        movie.cast.some((actor) => actor.toLowerCase().includes(normalizedCast))
      )
    }

    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genres.some((genre) => filters.genres?.includes(genre))
      )
    }

    if (filters.yearRange) {
      const [minYear, maxYear] = filters.yearRange
      filtered = filtered.filter((movie) => movie.year >= minYear && movie.year <= maxYear)
    }

    if (filters.ageRating && filters.ageRating !== 'ALL') {
      filtered = filtered.filter((movie) => movie.ageRating === filters.ageRating)
    }

    if (typeof filters.minRating === 'number' && filters.minRating > 0) {
      filtered = filtered.filter((movie) => movie.rating >= (filters.minRating ?? 0))
    }

    // Sorting
    const activeSort = filters.sortBy || sortBy
    filtered.sort((a, b) => {
      switch (activeSort) {
        case 'rating':
          return b.rating - a.rating
        case 'latest':
          return b.year !== a.year ? b.year - a.year : b.rating - a.rating
        case 'title':
          return a.title.localeCompare(b.title, 'pt-BR')
        case 'popularity':
        default:
          return b.popularity - a.popularity
      }
    })

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const currentPage = Math.min(Math.max(1, page), totalPages)
    const startIndex = (currentPage - 1) * pageSize
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize)

    return {
      items: paginatedItems,
      total,
      page: currentPage,
      pageSize,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    }
  },

  async getMovieById(id: string): Promise<Movie | null> {
    await new Promise((resolve) => setTimeout(resolve, 80))
    const movie = MOCK_MOVIES.find((m) => m.id === id)
    return movie || null
  },
}
