import type { MovieGenre } from '@/shared/constants/movie-constants'

export type { MovieGenre }

export type AgeRating = 'L' | '10+' | '12+' | '14+' | '16+' | '18+'

export type MovieSortOption = 'popularity' | 'rating' | 'latest' | 'title'

export interface Movie {
  id: string
  title: string
  originalTitle?: string
  posterUrl: string
  backdropUrl?: string
  rating: number
  votesCount?: number
  genres: MovieGenre[]
  year: number
  ageRating: AgeRating
  cast: string[]
  director?: string
  durationMinutes?: number
  synopsis?: string
  popularity: number
}

export interface MovieFilters {
  search?: string
  cast?: string
  genres?: MovieGenre[]
  yearRange?: [number, number]
  ageRating?: string
  minRating?: number
  sortBy?: MovieSortOption
}

export interface GetMoviesParams {
  page?: number
  pageSize?: number
  filters?: MovieFilters
  sortBy?: MovieSortOption
}

export interface GetMoviesResponse {
  items: Movie[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
