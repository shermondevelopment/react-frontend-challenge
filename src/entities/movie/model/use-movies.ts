import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { movieApi } from '../api/movie-api'
import type { GetMoviesParams, GetMoviesResponse } from './types'

export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: GetMoviesParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
}

export function useMovies(params: GetMoviesParams = {}) {
  return useQuery<GetMoviesResponse>({
    queryKey: movieKeys.list(params),
    queryFn: () => movieApi.getMovies(params),
    placeholderData: keepPreviousData,
  })
}

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getMovieById(id),
    enabled: Boolean(id),
  })
}
