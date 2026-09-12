export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbMovieDto {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids?: number[]
  genres?: TmdbGenre[]
  adult?: boolean
}

export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Movie {
  id: string
  tmdbId: number
  title: string
  originalTitle: string
  synopsis: string
  posterUrl: string
  backdropUrl: string | null
  rating: number
  voteCount: number
  popularity: number
  year: number
  releaseDate: string
  genreIds: number[]
  genreNames: string[]
}

export type MovieSortOption =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc'
  | 'title.asc'

export interface MovieFilters {
  search?: string
  genreIds?: number[]
  yearRange?: [number, number]
  minRating?: number
  sortBy?: MovieSortOption
}

export interface GetMoviesParams {
  page?: number
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
