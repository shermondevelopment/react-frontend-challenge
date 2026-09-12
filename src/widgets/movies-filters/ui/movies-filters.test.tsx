import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { useMovieFilters } from '@/features/filter-movies'
import { MoviesFilters } from './movies-filters'

function TestWrapper() {
  const filtersControl = useMovieFilters()
  return <MoviesFilters filtersControl={filtersControl} />
}

describe('MoviesFilters', () => {
  it('renders filter controls correctly', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    expect(screen.getAllByText('Filtros Avançados')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Elenco')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Gênero')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Ano de Lançamento')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Nota Mínima')[0]).toBeInTheDocument()

    const actionGenreChip = screen.getAllByTestId('genre-chip-Ação')[0]
    expect(actionGenreChip).toHaveAttribute('aria-pressed', 'false')

    await user.click(actionGenreChip)
    expect(actionGenreChip).toHaveAttribute('aria-pressed', 'true')
  })
})
