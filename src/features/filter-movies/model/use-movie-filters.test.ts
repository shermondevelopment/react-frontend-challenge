import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMovieFilters } from './use-movie-filters'

describe('useMovieFilters', () => {
  it('initializes with default values and allows updating filters', () => {
    const { result } = renderHook(() => useMovieFilters())

    expect(result.current.filters.search).toBe('')
    expect(result.current.filters.genres).toEqual([])
    expect(result.current.filters.minRating).toBe(0)
    expect(result.current.isDirty).toBe(false)

    act(() => {
      result.current.setSearch('Matrix')
      result.current.toggleGenre('Ação')
      result.current.setMinRating(8)
    })

    expect(result.current.filters.search).toBe('Matrix')
    expect(result.current.filters.genres).toContain('Ação')
    expect(result.current.filters.minRating).toBe(8)
    expect(result.current.isDirty).toBe(true)
    expect(result.current.activeFilterCount).toBeGreaterThan(0)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters.search).toBe('')
    expect(result.current.filters.genres).toEqual([])
    expect(result.current.filters.minRating).toBe(0)
    expect(result.current.isDirty).toBe(false)
  })
})
