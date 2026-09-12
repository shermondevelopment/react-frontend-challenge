import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { movieApi } from '../api/movie-api'
import type { GetMoviesParams, GetMoviesResponse, TmdbGenre } from './types'

export const movieKeys = {
  all: ['movies'] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: GetMoviesParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...movieKeys.details(), String(id)] as const,
}

export function useMovieGenres() {
  return useQuery<TmdbGenre[]>({
    queryKey: movieKeys.genres(),
    queryFn: () => movieApi.getGenres(),
    staleTime: 1000 * 60 * 60 * 24,
  })
}

export function useMovies(params: GetMoviesParams = {}) {
  return useQuery<GetMoviesResponse>({
    queryKey: movieKeys.list(params),
    queryFn: () => movieApi.getMovies(params),
    placeholderData: keepPreviousData,
  })
}

export function useMovieDetail(id: string | number) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getMovieById(id),
    enabled: Boolean(id),
  })
}
