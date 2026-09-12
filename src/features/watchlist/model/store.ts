import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '@/entities/movie'
import type { WatchlistStore } from './types'

function matchesMovieId(movie: Movie, id: number | string): boolean {
  return movie.id === String(id) || movie.tmdbId === Number(id)
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      isFavorite: (id: number | string) => {
        return get().items.some((movie) => matchesMovieId(movie, id))
      },

      add: (movie: Movie) => {
        const current = get().items
        if (current.some((m) => matchesMovieId(m, movie.id))) {
          return
        }
        set({ items: [...current, movie] })
      },

      remove: (id: number | string) => {
        set({
          items: get().items.filter((movie) => !matchesMovieId(movie, id)),
        })
      },

      toggle: (movie: Movie) => {
        const isFav = get().isFavorite(movie.id)
        if (isFav) {
          get().remove(movie.id)
        } else {
          get().add(movie)
        }
      },
    }),
    {
      name: 'cinedash-watchlist',
    }
  )
)
