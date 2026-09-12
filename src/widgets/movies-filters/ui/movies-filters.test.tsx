import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'
import { useMovieFilters } from '@/features/filter-movies'
import { MoviesFilters } from './movies-filters'

vi.mock('@/entities/movie', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/movie')>()
  return {
    ...actual,
    useMovieGenres: () => ({
      data: [
        { id: 28, name: 'Ação' },
        { id: 18, name: 'Drama' },
      ],
      isLoading: false,
    }),
  }
})

function TestWrapper() {
  const filtersControl = useMovieFilters()
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MoviesFilters filtersControl={filtersControl} />
    </QueryClientProvider>
  )
}

describe('MoviesFilters', () => {
  it('renders filter controls correctly', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    expect(screen.getAllByText('Filtros Avançados')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Gênero')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Ano de Lançamento')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Nota Mínima')[0]).toBeInTheDocument()

    const actionGenreChip = screen.getAllByTestId('genre-chip-28')[0]
    expect(actionGenreChip).toHaveAttribute('aria-pressed', 'false')

    await user.click(actionGenreChip)
    expect(actionGenreChip).toHaveAttribute('aria-pressed', 'true')
  })
})
