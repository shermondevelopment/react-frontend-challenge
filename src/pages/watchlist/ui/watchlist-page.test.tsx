import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useWatchlistStore } from '@/features/watchlist'
import { WatchlistPage } from './watchlist-page'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    activeProps,
    inactiveProps,
    ...props
  }: ComponentProps<'a'> & {
    children: ReactNode
    to: string
    activeProps?: ComponentProps<'a'>
    inactiveProps?: ComponentProps<'a'>
  }) => {
    const isActive = to === '/watchlist'
    const routeProps = isActive ? activeProps : inactiveProps
    return (
      <a href={to} {...props} {...routeProps} aria-current={isActive ? 'page' : undefined}>
        {children}
      </a>
    )
  },
}))

vi.mock('@/features/auth/logout', () => ({
  useLogout: () => ({ handleLogout: vi.fn() }),
}))

vi.mock('@/features/theme', () => ({
  useTheme: () => ({
    isDarkTheme: true,
    setTheme: vi.fn(),
  }),
}))

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('WatchlistPage', () => {
  beforeEach(() => {
    useWatchlistStore.setState({ items: [] })
  })

  it('renders page header and empty watchlist state', () => {
    renderWithProviders(<WatchlistPage />)

    expect(screen.getByRole('link', { name: /cinedash home/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Watchlist' })).toBeInTheDocument()
    expect(screen.getByText('Nenhum filme na sua Watchlist')).toBeInTheDocument()
  })
})
