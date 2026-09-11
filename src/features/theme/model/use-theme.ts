import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const themeStorageKey = 'cinedash-theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const persistedTheme = window.localStorage.getItem(themeStorageKey)

  if (isTheme(persistedTheme)) {
    return persistedTheme
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const isDarkTheme = theme === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme)
    window.localStorage.setItem(themeStorageKey, theme)
  }, [isDarkTheme, theme])

  return {
    theme,
    isDarkTheme,
    setTheme,
  }
}