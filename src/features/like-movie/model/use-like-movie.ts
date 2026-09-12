import { useLikedMoviesStore } from './store'

export function useLikeMovie(movieId?: string) {
  const isLiked = useLikedMoviesStore((state) => (movieId ? state.isLiked(movieId) : false))
  const toggleLike = useLikedMoviesStore((state) => state.toggleLike)
  const likedMovieIds = useLikedMoviesStore((state) => state.likedMovieIds)

  return {
    isLiked,
    likedCount: likedMovieIds.length,
    toggleLike: () => {
      if (movieId) {
        toggleLike(movieId)
      }
    },
  }
}
