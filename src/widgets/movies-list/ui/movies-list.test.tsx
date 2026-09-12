import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { useMovieFilters } from '@/features/filter-movies'
import { MoviesList } from './movies-list'

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

function TestMoviesList() {
  const filtersControl = useMovieFilters()
  return <MoviesList filtersControl={filtersControl} />
}

describe('MoviesList', () => {
  it('renders loading skeleton and then renders movie cards', async () => {
    renderWithProviders(<TestMoviesList />)

    expect(screen.getByTestId('movies-loading-skeleton')).toBeInTheDocument()

    await waitFor(
      () => {
        expect(screen.getByTestId('movies-grid')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    expect(screen.getByText('O Último Refúgio')).toBeInTheDocument()
  })
})
