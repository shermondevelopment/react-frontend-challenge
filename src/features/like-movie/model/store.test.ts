import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useLikedMoviesStore } from './store'
import { useLikeMovie } from './use-like-movie'

describe('useLikedMoviesStore & useLikeMovie', () => {
  beforeEach(() => {
    window.localStorage.clear()
    act(() => {
      useLikedMoviesStore.setState({ likedMovieIds: [] })
    })
  })

  it('toggles like state for a movie', () => {
    const { result } = renderHook(() => useLikeMovie('movie-99'))

    expect(result.current.isLiked).toBe(false)
    expect(result.current.likedCount).toBe(0)

    act(() => {
      result.current.toggleLike()
    })

    expect(result.current.isLiked).toBe(true)
    expect(result.current.likedCount).toBe(1)

    act(() => {
      result.current.toggleLike()
    })

    expect(result.current.isLiked).toBe(false)
    expect(result.current.likedCount).toBe(0)
  })
})
