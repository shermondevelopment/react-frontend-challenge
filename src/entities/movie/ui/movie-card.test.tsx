import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Movie } from '../model/types'
import { MovieCard } from './movie-card'

const mockMovie: Movie = {
  id: 'movie-test-1',
  title: 'Interestelar',
  posterUrl: 'https://example.com/poster.jpg',
  rating: 8.9,
  genres: ['Ficção Científica', 'Drama'],
  year: 2014,
  ageRating: '10+',
  cast: ['Matthew McConaughey', 'Anne Hathaway'],
  popularity: 100,
}

describe('MovieCard', () => {
  it('renders movie title, year, age rating and primary genre', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByRole('heading', { name: 'Interestelar' })).toBeInTheDocument()
    expect(screen.getByText('2014')).toBeInTheDocument()
    expect(screen.getByText('10+')).toBeInTheDocument()
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
