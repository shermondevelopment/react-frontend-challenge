import { create } from 'zustand'

const WATCHLIST_STORAGE_KEY = 'cinedash-liked-movies'

interface LikedMoviesState {
  likedMovieIds: string[]
  isLiked: (movieId: string) => boolean
  toggleLike: (movieId: string) => void
  addLike: (movieId: string) => void
  removeLike: (movieId: string) => void
}

function getInitialLikedMovies(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

export const useLikedMoviesStore = create<LikedMoviesState>((set, get) => ({
  likedMovieIds: getInitialLikedMovies(),

  isLiked: (movieId: string) => get().likedMovieIds.includes(movieId),

  toggleLike: (movieId: string) => {
    const current = get().likedMovieIds
    const isCurrentlyLiked = current.includes(movieId)
    const updated = isCurrentlyLiked
      ? current.filter((id) => id !== movieId)
      : [...current, movieId]

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated))
    }

    set({ likedMovieIds: updated })
  },

  addLike: (movieId: string) => {
    const current = get().likedMovieIds
    if (current.includes(movieId)) return
    const updated = [...current, movieId]
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated))
    }
    set({ likedMovieIds: updated })
  },

  removeLike: (movieId: string) => {
    const updated = get().likedMovieIds.filter((id) => id !== movieId)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated))
    }
    set({ likedMovieIds: updated })
  },
}))
