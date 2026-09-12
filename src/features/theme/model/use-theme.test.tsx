import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './use-theme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
  })

  it('uses dark theme by default when there is no persisted preference', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(result.current.isDarkTheme).toBe(true)
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('cinedash-theme')).toBe('dark')
  })

  it('persists and applies light theme', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('light')
    })

    expect(result.current.theme).toBe('light')
    expect(result.current.isDarkTheme).toBe(false)
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('cinedash-theme')).toBe('light')
  })
})