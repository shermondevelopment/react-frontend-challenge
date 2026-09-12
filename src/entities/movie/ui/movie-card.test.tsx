import { render, screen } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { Movie } from '../model/types'
import { MovieCard } from './movie-card'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: ComponentProps<'a'> & { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

const mockMovie: Movie = {
  id: '157336',
  tmdbId: 157336,
  title: 'Interestelar',
  originalTitle: 'Interstellar',
  synopsis: 'As reservas naturais da Terra estão chegando ao fim...',
  posterUrl: 'https://example.com/poster.jpg',
  backdropUrl: 'https://example.com/backdrop.jpg',
  rating: 8.9,
  voteCount: 32000,
  genreIds: [878, 18],
  genreNames: ['Ficção Científica', 'Drama'],
  year: 2014,
  releaseDate: '2014-11-05',
  popularity: 100,
}

describe('MovieCard', () => {
  it('renders movie title, year and primary genre', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByRole('heading', { name: 'Interestelar' })).toBeInTheDocument()
    expect(screen.getByText('2014')).toBeInTheDocument()
    expect(screen.getByText('Ficção Científica')).toBeInTheDocument()
    expect(screen.getByText('8.9')).toBeInTheDocument()
  })

  it('renders action slot when provided', () => {
    render(
      <MovieCard
        movie={mockMovie}
        actionSlot={<button data-testid="custom-action">Favorite</button>}
      />
    )

    expect(screen.getByTestId('custom-action')).toBeInTheDocument()
  })
})
