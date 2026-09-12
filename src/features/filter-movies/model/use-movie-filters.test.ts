import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMovieFilters } from './use-movie-filters'

describe('useMovieFilters', () => {
  it('initializes with default values and allows updating filters', () => {
    const { result } = renderHook(() => useMovieFilters())

    expect(result.current.filters.search).toBe('')
    expect(result.current.filters.genreIds).toEqual([])
    expect(result.current.filters.minRating).toBe(0)
    expect(result.current.isDirty).toBe(false)

    act(() => {
      result.current.setSearch('Matrix')
      result.current.toggleGenre(28)
      result.current.setMinRating(8)
    })

    expect(result.current.filters.search).toBe('Matrix')
    expect(result.current.filters.genreIds).toContain(28)
    expect(result.current.filters.minRating).toBe(8)
    expect(result.current.isDirty).toBe(true)
    expect(result.current.activeFilterCount).toBeGreaterThan(0)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters.search).toBe('')
    expect(result.current.filters.genreIds).toEqual([])
    expect(result.current.filters.minRating).toBe(0)
    expect(result.current.isDirty).toBe(false)
  })

  it('parses genreIds from URL with JSON array format', () => {
    window.history.pushState({}, '', '/?genreIds=%5B"28"%2C"12"%5D')
    const { result } = renderHook(() => useMovieFilters())
    expect(result.current.filters.genreIds).toEqual([28, 12])
  })

  it('parses genres from URL with comma separated format', () => {
    window.history.pushState({}, '', '/?genres=18,80')
    const { result } = renderHook(() => useMovieFilters())
    expect(result.current.filters.genreIds).toEqual([18, 80])
  })
})
