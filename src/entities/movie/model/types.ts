export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbReleaseDateItem {
  certification: string
  descriptors?: string[]
  iso_639_1?: string
  note?: string
  release_date: string
  type: number
}

export interface TmdbReleaseDateResult {
  iso_3166_1: string
  release_dates: TmdbReleaseDateItem[]
}

export interface TmdbReleaseDatesResponse {
  results: TmdbReleaseDateResult[]
}

export interface TmdbVideoItem {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
}

export interface TmdbVideosResponse {
  results: TmdbVideoItem[]
}

export interface TmdbCastItem {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface TmdbCrewItem {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface TmdbCreditsResponse {
  cast: TmdbCastItem[]
  crew: TmdbCrewItem[]
}

export interface MovieCastMember {
  id: number
  name: string
  character: string
  profileUrl: string | null
}

export interface MovieTrailer {
  id: string
  key: string
  name: string
  site: string
  url: string
  thumbnailUrl: string
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
  runtime?: number
  tagline?: string
  status?: string
  spoken_languages?: Array<{ english_name: string; iso_639_1: string; name: string }>
  production_companies?: Array<{ id: number; logo_path: string | null; name: string; origin_country: string }>
  release_dates?: TmdbReleaseDatesResponse
  videos?: TmdbVideosResponse
  credits?: TmdbCreditsResponse
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

export interface MovieDetails extends Movie {
  runtime?: number
  durationFormatted?: string
  tagline?: string
  status?: string
  director?: string
  certification?: string
  ageRatingFormatted?: string
  languages?: string[]
  studios?: string[]
  cast?: MovieCastMember[]
  trailer?: MovieTrailer | null
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
