import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MoviesPage } from './movies-page'

vi.mock('@/shared/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return {
    ...actual,
    tmdbApiClient: {
      get: vi.fn().mockImplementation((url: string) => {
        if (url === '/genre/movie/list') {
          return Promise.resolve({
            data: {
              genres: [
                { id: 18, name: 'Drama' },
                { id: 28, name: 'Ação' },
              ],
            },
          })
        }
        return Promise.resolve({
          data: {
            page: 1,
            results: [
              {
                id: 550,
                title: 'Clube da Luta',
                original_title: 'Fight Club',
                overview: 'Um homem com insônia...',
                poster_path: '/poster.jpg',
                backdrop_path: null,
                vote_average: 8.4,
                vote_count: 26000,
                genre_ids: [18],
                release_date: '1999-10-15',
                popularity: 85,
              },
            ],
            total_pages: 1,
            total_results: 1,
          },
        })
      }),
    },
  }
})

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
      expect(screen.getByText('Clube da Luta')).toBeInTheDocument()
    })
  })
})
