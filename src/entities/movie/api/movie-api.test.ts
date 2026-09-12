import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tmdbApiClient } from '@/shared/api'
import { movieApi } from './movie-api'

vi.mock('@/shared/api', () => ({
  tmdbApiClient: {
    get: vi.fn(),
  },
  getTmdbImageUrl: (path: string | null) => (path ? `https://image.tmdb.org/t/p/w500${path}` : ''),
}))

describe('movieApi with TMDB', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches genres from /genre/movie/list', async () => {
    const mockGenres = [
      { id: 28, name: 'Ação' },
      { id: 18, name: 'Drama' },
    ]
    vi.mocked(tmdbApiClient.get).mockResolvedValueOnce({
      data: { genres: mockGenres },
    } as never)

    const genres = await movieApi.getGenres()
    expect(tmdbApiClient.get).toHaveBeenCalledWith('/genre/movie/list', {
      params: { language: 'pt-BR' },
    })
    expect(genres).toEqual(mockGenres)
  })

  it('uses /discover/movie when no search query is present', async () => {
    vi.mocked(tmdbApiClient.get).mockResolvedValueOnce({
      data: {
        page: 1,
        results: [
          {
            id: 101,
            title: 'Interestelar',
            original_title: 'Interstellar',
            overview: 'Uma aventura no espaço.',
            poster_path: '/poster.jpg',
            backdrop_path: '/backdrop.jpg',
            release_date: '2014-11-07',
            vote_average: 8.6,
            vote_count: 32000,
            popularity: 120,
            genre_ids: [878, 18],
          },
        ],
        total_pages: 5,
        total_results: 100,
      },
    } as never)

    const response = await movieApi.getMovies({
      page: 1,
      filters: {
        genreIds: [878, 18],
        yearRange: [2010, 2020],
        minRating: 8,
        sortBy: 'vote_average.desc',
      },
    })

    expect(tmdbApiClient.get).toHaveBeenCalledWith(
      '/discover/movie',
      expect.objectContaining({
        params: expect.objectContaining({
          page: 1,
          language: 'pt-BR',
          with_genres: '878|18',
          'vote_average.gte': 8,
          'primary_release_date.gte': '2010-01-01',
          'primary_release_date.lte': '2020-12-31',
          sort_by: 'vote_average.desc',
        }),
      })
    )

    expect(response.items).toHaveLength(1)
    expect(response.items[0].title).toBe('Interestelar')
    expect(response.items[0].year).toBe(2014)
  })

  it('uses /search/movie when search text is provided', async () => {
    vi.mocked(tmdbApiClient.get).mockResolvedValueOnce({
      data: {
        page: 1,
        results: [
          {
            id: 202,
            title: 'Matrix',
            original_title: 'The Matrix',
            overview: 'Bem-vindo ao mundo real.',
            poster_path: '/matrix.jpg',
            release_date: '1999-03-31',
            vote_average: 8.2,
            vote_count: 24000,
            popularity: 85,
            genre_ids: [28, 878],
          },
        ],
        total_pages: 1,
        total_results: 1,
      },
    } as never)

    const response = await movieApi.getMovies({
      filters: { search: 'Matrix' },
    })

    expect(tmdbApiClient.get).toHaveBeenCalledWith(
      '/search/movie',
      expect.objectContaining({
        params: expect.objectContaining({
          query: 'Matrix',
          page: 1,
          language: 'pt-BR',
        }),
      })
    )

    expect(response.items).toHaveLength(1)
    expect(response.items[0].title).toBe('Matrix')
  })

  it('fetches single movie detail with append_to_response=release_dates,videos,credits from /movie/:id', async () => {
    vi.mocked(tmdbApiClient.get).mockResolvedValueOnce({
      data: {
        id: 550,
        title: 'Clube da Luta',
        original_title: 'Fight Club',
        overview: 'Um homem deprimido...',
        poster_path: '/fightclub.jpg',
        backdrop_path: '/fightclub_backdrop.jpg',
        release_date: '1999-10-15',
        vote_average: 8.4,
        vote_count: 26000,
        popularity: 90,
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

    const movie = await movieApi.getMovieById(550)
    expect(tmdbApiClient.get).toHaveBeenCalledWith('/movie/550', {
      params: {
        language: 'pt-BR',
        append_to_response: 'release_dates,videos,credits',
      },
    })
    expect(movie?.title).toBe('Clube da Luta')
    expect(movie?.genreNames).toContain('Drama')
    expect(movie?.certification).toBe('18+')
    expect(movie?.durationFormatted).toBe('2h 19m')
    expect(movie?.trailer?.key).toBe('qtRKdVBl-7g')
    expect(movie?.director).toBe('David Fincher')
    expect(movie?.cast?.[0]?.name).toBe('Edward Norton')
  })
})
