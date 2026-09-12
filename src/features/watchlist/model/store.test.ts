import { act } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Movie } from '@/entities/movie'
import {
  selectWatchlistCount,
  selectWatchlistItems,
} from '../lib/selectors'
import { useWatchlistStore } from './store'

const mockMovie1: Movie = {
  id: '550',
  tmdbId: 550,
  title: 'Clube da Luta',
  originalTitle: 'Fight Club',
  synopsis: 'Um homem com insônia...',
  posterUrl: 'https://example.com/poster.jpg',
  backdropUrl: null,
  rating: 8.4,
  voteCount: 26000,
  popularity: 85,
  year: 1999,
  releaseDate: '1999-10-15',
  genreIds: [18],
  genreNames: ['Drama'],
}

const mockMovie2: Movie = {
  id: '157336',
  tmdbId: 157336,
  title: 'Interestelar',
  originalTitle: 'Interstellar',
  synopsis: 'Uma jornada estelar...',
  posterUrl: 'https://example.com/poster2.jpg',
  backdropUrl: null,
  rating: 8.6,
  voteCount: 32000,
  popularity: 120,
  year: 2014,
  releaseDate: '2014-11-05',
  genreIds: [878, 18],
  genreNames: ['Ficção Científica', 'Drama'],
}

describe('useWatchlistStore', () => {
  beforeEach(() => {
    localStorage.clear()
    act(() => {
      useWatchlistStore.setState({ items: [] })
    })
  })

  it('adds a movie to watchlist and marks as favorite', () => {
    expect(useWatchlistStore.getState().isFavorite('550')).toBe(false)
    expect(useWatchlistStore.getState().isFavorite(550)).toBe(false)

    act(() => {
      useWatchlistStore.getState().add(mockMovie1)
    })

    expect(useWatchlistStore.getState().isFavorite('550')).toBe(true)
    expect(useWatchlistStore.getState().isFavorite(550)).toBe(true)
    expect(selectWatchlistCount(useWatchlistStore.getState())).toBe(1)
    expect(selectWatchlistItems(useWatchlistStore.getState())).toEqual([mockMovie1])
  })

  it('prevents adding duplicate movies to watchlist', () => {
    act(() => {
      useWatchlistStore.getState().add(mockMovie1)
      useWatchlistStore.getState().add(mockMovie1)
    })

    expect(selectWatchlistCount(useWatchlistStore.getState())).toBe(1)
  })

  it('removes a movie by string or number id', () => {
    act(() => {
      useWatchlistStore.getState().add(mockMovie1)
      useWatchlistStore.getState().add(mockMovie2)
    })

    expect(selectWatchlistCount(useWatchlistStore.getState())).toBe(2)

    act(() => {
      useWatchlistStore.getState().remove(550)
    })

    expect(useWatchlistStore.getState().isFavorite('550')).toBe(false)
    expect(selectWatchlistCount(useWatchlistStore.getState())).toBe(1)
  })

  it('toggles movie state in watchlist', () => {
    act(() => {
      useWatchlistStore.getState().toggle(mockMovie1)
    })
    expect(useWatchlistStore.getState().isFavorite('550')).toBe(true)

    act(() => {
      useWatchlistStore.getState().toggle(mockMovie1)
    })
    expect(useWatchlistStore.getState().isFavorite('550')).toBe(false)
  })
})
