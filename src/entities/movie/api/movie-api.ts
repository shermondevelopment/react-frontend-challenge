import { tmdbApiClient } from '@/shared/api'
import { mapTmdbMovieToEntity } from '../model/movie-helpers'
import type {
  GetMoviesParams,
  GetMoviesResponse,
  Movie,
  TmdbGenre,
  TmdbMovieDto,
  TmdbPaginatedResponse,
} from '../model/types'

export const movieApi = {
  async getGenres(): Promise<TmdbGenre[]> {
    const { data } = await tmdbApiClient.get<{ genres: TmdbGenre[] }>(
      '/genre/movie/list',
      {
        params: { language: 'pt-BR' },
      }
    )
    return data.genres || []
  },

  async getMovies(params: GetMoviesParams = {}): Promise<GetMoviesResponse> {
    const { page = 1, filters = {}, sortBy = 'popularity.desc' } = params

    const searchQuery = filters.search?.trim()

    if (searchQuery) {
      const searchParams: Record<string, string | number | boolean> = {
        query: searchQuery,
        page,
        language: 'pt-BR',
        include_adult: false,
      }

      if (filters.yearRange && filters.yearRange[0] === filters.yearRange[1]) {
        searchParams.primary_release_year = filters.yearRange[0]
      }

      const { data } = await tmdbApiClient.get<TmdbPaginatedResponse<TmdbMovieDto>>(
        '/search/movie',
        { params: searchParams }
      )

      let items = (data.results || []).map((dto) => mapTmdbMovieToEntity(dto))

      if (filters.genreIds && filters.genreIds.length > 0) {
        items = items.filter((movie) =>
          movie.genreIds.some((id) => filters.genreIds?.includes(id))
        )
      }

      if (typeof filters.minRating === 'number' && filters.minRating > 0) {
        items = items.filter((movie) => movie.rating >= (filters.minRating ?? 0))
      }

      if (filters.yearRange) {
        const [minYear, maxYear] = filters.yearRange
        items = items.filter((movie) => movie.year >= minYear && movie.year <= maxYear)
      }

      return {
        items,
        total: data.total_results,
        page: data.page,
        pageSize: 20,
        totalPages: Math.min(data.total_pages, 500),
        hasNextPage: data.page < Math.min(data.total_pages, 500),
        hasPrevPage: data.page > 1,
      }
    }

    const discoverParams: Record<string, string | number | boolean> = {
      page,
      language: 'pt-BR',
      include_adult: false,
      sort_by: filters.sortBy || sortBy,
    }

    if (filters.genreIds && filters.genreIds.length > 0) {
      discoverParams.with_genres = filters.genreIds.join('|')
    }

    if (typeof filters.minRating === 'number' && filters.minRating > 0) {
      discoverParams['vote_average.gte'] = filters.minRating
      discoverParams['vote_count.gte'] = 50
    }

    if (filters.yearRange) {
      const [minYear, maxYear] = filters.yearRange
      discoverParams['primary_release_date.gte'] = `${minYear}-01-01`
      discoverParams['primary_release_date.lte'] = `${maxYear}-12-31`
    }

    const { data } = await tmdbApiClient.get<TmdbPaginatedResponse<TmdbMovieDto>>(
      '/discover/movie',
      { params: discoverParams }
    )

    const items = (data.results || []).map((dto) => mapTmdbMovieToEntity(dto))

    return {
      items,
      total: data.total_results,
      page: data.page,
      pageSize: 20,
      totalPages: Math.min(data.total_pages, 500),
      hasNextPage: data.page < Math.min(data.total_pages, 500),
      hasPrevPage: data.page > 1,
    }
  },

  async getMovieById(id: string | number): Promise<Movie | null> {
    try {
      const { data } = await tmdbApiClient.get<TmdbMovieDto>(`/movie/${id}`, {
        params: { language: 'pt-BR' },
      })
      return mapTmdbMovieToEntity(data)
    } catch {
      return null
    }
  },
}
