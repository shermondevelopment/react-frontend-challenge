import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie } from '@/entities/movie'
import { useWatchlistStore } from '../model/store'
import { WatchlistButton } from './WatchlistButton'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}))

const mockMovie: Movie = {
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

describe('WatchlistButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useWatchlistStore.setState({ items: [] })
  })

  it('renders unpressed state and toggles to pressed on click', async () => {
    const user = userEvent.setup()
    render(<WatchlistButton movie={mockMovie} />)

    const button = screen.getByRole('button', {
      name: /adicionar clube da luta à watchlist/i,
    })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)

    expect(toast.success).toHaveBeenCalledWith(
      '"Clube da Luta" adicionado à watchlist com sucesso!'
    )

    expect(
      screen.getByRole('button', {
        name: /remover clube da luta da watchlist/i,
      })
    ).toHaveAttribute('aria-pressed', 'true')

    await user.click(button)

    expect(toast.info).toHaveBeenCalledWith(
      '"Clube da Luta" removido da watchlist.'
    )
  })

  it('renders with label when showLabel is true', () => {
    render(<WatchlistButton movie={mockMovie} showLabel={true} />)

    expect(screen.getByText('Adicionar à Watchlist')).toBeInTheDocument()
  })
})
