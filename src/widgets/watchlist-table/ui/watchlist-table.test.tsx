import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie } from '@/entities/movie'
import { useWatchlistStore } from '@/features/watchlist'
import { WatchlistTable } from './watchlist-table'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: ComponentProps<'a'> & { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/entities/movie', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/movie')>()
  return {
    ...actual,
    useMovieGenres: () => ({
      data: [
        { id: 18, name: 'Drama' },
        { id: 878, name: 'Ficção Científica' },
      ],
      isLoading: false,
    }),
  }
})

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
  genreIds: [878],
  genreNames: ['Ficção Científica'],
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('WatchlistTable', () => {
  beforeEach(() => {
    useWatchlistStore.setState({ items: [] })
  })

  it('renders empty state when there are no items', () => {
    renderWithProviders(<WatchlistTable />)

    expect(screen.getByTestId('watchlist-empty-state')).toBeInTheDocument()
    expect(screen.getByText('Nenhum filme na sua Watchlist')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar Catálogo' })).toHaveAttribute(
      'href',
      '/discovery'
    )
  })

  it('renders table rows when items exist and allows removing items', async () => {
    const user = userEvent.setup()
    useWatchlistStore.setState({ items: [mockMovie1, mockMovie2] })

    renderWithProviders(<WatchlistTable />)

    expect(screen.getByTestId('watchlist-table')).toBeInTheDocument()
    expect(screen.getByText('Clube da Luta')).toBeInTheDocument()
    expect(screen.getByText('Interestelar')).toBeInTheDocument()
    expect(screen.getByText('15/10/1999')).toBeInTheDocument()
    expect(screen.getByText('05/11/2014')).toBeInTheDocument()

    const removeButton = screen.getByTestId('remove-watchlist-550')
    await user.click(removeButton)

    expect(screen.queryByText('Clube da Luta')).not.toBeInTheDocument()
    expect(screen.getByText('Interestelar')).toBeInTheDocument()
  })

  it('sorts movies when clicking table headers', async () => {
    const user = userEvent.setup()
    useWatchlistStore.setState({ items: [mockMovie1, mockMovie2] })

    renderWithProviders(<WatchlistTable />)

    const ratingHeader = screen.getByRole('button', { name: /avaliação/i })
    await user.click(ratingHeader)

    const rows = screen.getAllByTestId(/watchlist-row-/)
    expect(rows[0]).toHaveTextContent('Interestelar')
    expect(rows[1]).toHaveTextContent('Clube da Luta')

    await user.click(ratingHeader)
    const reversedRows = screen.getAllByTestId(/watchlist-row-/)
    expect(reversedRows[0]).toHaveTextContent('Clube da Luta')
    expect(reversedRows[1]).toHaveTextContent('Interestelar')
  })
})
