import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MoviesPage } from './movies-page'

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
    const isActive = to === '/discovery'
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('MoviesPage', () => {
  it('renders header, filters and movie list widgets successfully', async () => {
    renderWithProviders(<MoviesPage />)

    expect(screen.getByRole('link', { name: /cinedash home/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Filmes Disponíveis' })).toBeInTheDocument()
    expect(screen.getAllByText('Filtros Avançados')[0]).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('O Último Refúgio')).toBeInTheDocument()
    })
  })
})
