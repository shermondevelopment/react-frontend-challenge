import type { Movie } from '@/entities/movie'
import type { WatchlistStore } from '../model/types'

export const selectWatchlistItems = (state: WatchlistStore): Movie[] => state.items

export const selectWatchlistCount = (state: WatchlistStore): number => state.items.length

export const createSelectIsFavorite =
  (id: number | string) =>
  (state: WatchlistStore): boolean =>
    state.isFavorite(id)
