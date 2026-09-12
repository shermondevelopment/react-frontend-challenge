import type { Movie } from '@/entities/movie'

export interface WatchlistStore {
  items: Movie[]
  add: (movie: Movie) => void
  remove: (id: number | string) => void
  toggle: (movie: Movie) => void
  isFavorite: (id: number | string) => boolean
}
