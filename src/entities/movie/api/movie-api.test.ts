import { describe, expect, it } from 'vitest'
import { movieApi } from './movie-api'

describe('movieApi', () => {
  it('returns all movies paginated with default page size', async () => {
    const response = await movieApi.getMovies({ page: 1, pageSize: 8 })
    expect(response.items).toHaveLength(8)
    expect(response.total).toBeGreaterThan(8)
    expect(response.page).toBe(1)
    expect(response.totalPages).toBeGreaterThan(1)
    expect(response.hasNextPage).toBe(true)
    expect(response.hasPrevPage).toBe(false)
  })

  it('filters movies by search query in title', async () => {
    const response = await movieApi.getMovies({
      filters: { search: 'Último' },
    })
    expect(response.items.length).toBeGreaterThanOrEqual(1)
    expect(response.items[0].title).toContain('Último')
  })

  it('filters movies by cast / actor', async () => {
    const response = await movieApi.getMovies({
      filters: { cast: 'Keanu Reeves' },
    })
    expect(response.items.length).toBeGreaterThanOrEqual(1)
    expect(response.items.every((m) => m.cast.includes('Keanu Reeves'))).toBe(true)
  })

  it('filters movies by genre', async () => {
    const response = await movieApi.getMovies({
      filters: { genres: ['Ficção Científica'] },
    })
    expect(response.items.length).toBeGreaterThanOrEqual(1)
    expect(
      response.items.every((m) => m.genres.includes('Ficção Científica'))
    ).toBe(true)
  })

  it('filters movies by year range', async () => {
    const response = await movieApi.getMovies({
      filters: { yearRange: [2022, 2024] },
    })
    expect(
      response.items.every((m) => m.year >= 2022 && m.year <= 2024)
    ).toBe(true)
  })

  it('filters movies by minimum rating', async () => {
    const response = await movieApi.getMovies({
      filters: { minRating: 8.5 },
    })
    expect(response.items.every((m) => m.rating >= 8.5)).toBe(true)
  })

  it('filters movies by age rating classification', async () => {
    const response = await movieApi.getMovies({
      filters: { ageRating: '16+' },
    })
    expect(response.items.every((m) => m.ageRating === '16+')).toBe(true)
  })

  it('sorts movies by rating descending', async () => {
    const response = await movieApi.getMovies({
      sortBy: 'rating',
    })
    const ratings = response.items.map((m) => m.rating)
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1])
    }
  })

  it('sorts movies by title alphabetically', async () => {
    const response = await movieApi.getMovies({
      sortBy: 'title',
    })
    const titles = response.items.map((m) => m.title)
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b, 'pt-BR'))
    expect(titles).toEqual(sortedTitles)
  })

  it('fetches movie detail by id', async () => {
    const movie = await movieApi.getMovieById('movie-1')
    expect(movie).not.toBeNull()
    expect(movie?.id).toBe('movie-1')
    expect(movie?.title).toBe('O Último Refúgio')
  })
})
