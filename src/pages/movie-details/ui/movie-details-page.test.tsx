import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tmdbApiClient } from '@/shared/api'
import { MovieDetailsPage } from './movie-details-page'

vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ id: '550' }),
  Link: ({ children, to, ...props }: ComponentProps<'a'> & { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/shared/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return {
    ...actual,
    tmdbApiClient: {
      get: vi.fn(),
    },
  }
})

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
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('MovieDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches movie details in a single request and displays backdrop, title, overview, trailer, cast and certification', async () => {
    vi.mocked(tmdbApiClient.get).mockResolvedValueOnce({
      data: {
        id: 550,
        title: 'Clube da Luta',
        original_title: 'Fight Club',
        overview: 'Um homem com insônia e um vendedor de sabão...',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '1999-10-15',
        vote_average: 8.4,
        vote_count: 26000,
        popularity: 85,
        runtime: 139,
        tagline: 'Mischief. Mayhem. Soap.',
        genres: [{ id: 18, name: 'Drama' }],
        release_dates: {
          results: [
            {
              iso_3166_1: 'BR',
              release_dates: [{ certification: '18', release_date: '1999-10-29', type: 3 }],
            },
          ],
        },
        videos: {
          results: [
            {
              id: 'vid1',
              key: 'qtRKdVBl-7g',
              name: 'Trailer Oficial',
              site: 'YouTube',
              type: 'Trailer',
              official: true,
              size: 1080,
              published_at: '2020-01-01',
              iso_639_1: 'en',
              iso_3166_1: 'US',
            },
          ],
        },
        credits: {
          cast: [
            {
              id: 819,
              name: 'Edward Norton',
              character: 'O Narrador',
              profile_path: '/norton.jpg',
              adult: false,
              gender: 2,
              known_for_department: 'Acting',
              original_name: 'Edward Norton',
              popularity: 45,
              cast_id: 4,
              credit_id: 'cr1',
              order: 0,
            },
            {
              id: 287,
              name: 'Brad Pitt',
              character: 'Tyler Durden',
              profile_path: '/pitt.jpg',
              adult: false,
              gender: 2,
              known_for_department: 'Acting',
              original_name: 'Brad Pitt',
              popularity: 80,
              cast_id: 5,
              credit_id: 'cr2',
              order: 1,
            },
          ],
          crew: [
            {
              id: 7467,
              name: 'David Fincher',
              job: 'Director',
              department: 'Directing',
              adult: false,
              gender: 2,
              known_for_department: 'Directing',
              original_name: 'David Fincher',
              popularity: 30,
              profile_path: '/fincher.jpg',
              credit_id: 'cr3',
            },
          ],
        },
      },
    } as never)

    renderWithProviders(<MovieDetailsPage />)

    expect(screen.getByTestId('movie-details-skeleton')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Clube da Luta')).toBeInTheDocument()
    })

    expect(tmdbApiClient.get).toHaveBeenCalledTimes(1)
    expect(tmdbApiClient.get).toHaveBeenCalledWith('/movie/550', {
      params: {
        language: 'pt-BR',
        append_to_response: 'release_dates,videos,credits',
      },
    })

    expect(screen.getByText('18+')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect(screen.getByText('Sinopse')).toBeInTheDocument()
    expect(
      screen.getByText('Um homem com insônia e um vendedor de sabão...')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar clube da luta à watchlist/i })).toBeInTheDocument()
    expect(screen.getAllByText('Trailer Oficial')[0]).toBeInTheDocument()
    expect(screen.getByText('Elenco Principal')).toBeInTheDocument()
    expect(screen.getByText('Edward Norton')).toBeInTheDocument()
    expect(screen.getByText('Brad Pitt')).toBeInTheDocument()
    expect(screen.getByText('David Fincher')).toBeInTheDocument()
  })
})
