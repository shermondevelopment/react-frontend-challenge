import { getTmdbImageUrl } from '@/shared/api'
import type { Movie, TmdbGenre, TmdbMovieDto } from './types'

export const DEFAULT_TMDB_GENRES: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Cinema TV',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste',
}

export function formatRating(rating: number): string {
  if (typeof rating !== 'number' || isNaN(rating)) return '0.0'
  return rating.toFixed(1)
}

export function formatYear(dateString?: string): number {
  if (!dateString) return new Date().getFullYear()
  const year = parseInt(dateString.slice(0, 4), 10)
  return isNaN(year) ? new Date().getFullYear() : year
}

export function formatReleaseDate(dateString?: string): string {
  if (!dateString) return 'Data não informada'
  try {
    const parts = dateString.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return dateString
  } catch {
    return dateString
  }
}

export function getGenreNames(
  movie: Movie,
  genresOrMap?: TmdbGenre[] | Record<number, string>
): string[] {
  if (!genresOrMap) {
    return movie.genreNames?.length > 0 ? movie.genreNames : ['Geral']
  }

  const genreMap = Array.isArray(genresOrMap)
    ? buildGenreMap(genresOrMap)
    : genresOrMap

  const names = movie.genreIds
    .map((id) => genreMap[id])
    .filter(Boolean)

  if (names.length > 0) return names
  return movie.genreNames?.length > 0 ? movie.genreNames : ['Geral']
}

export function mapTmdbMovieToEntity(
  dto: TmdbMovieDto,
  genreMap: Record<number, string> = DEFAULT_TMDB_GENRES
): Movie {
  const genreIds = dto.genre_ids || (dto.genres ? dto.genres.map((g) => g.id) : [])
  const genreNames = dto.genres
    ? dto.genres.map((g) => g.name)
    : genreIds.map((id) => genreMap[id]).filter(Boolean)

  return {
    id: String(dto.id),
    tmdbId: dto.id,
    title: dto.title || dto.original_title || 'Sem título',
    originalTitle: dto.original_title || '',
    synopsis: dto.overview || 'Sinopse indisponível no momento.',
    posterUrl: getTmdbImageUrl(dto.poster_path, 'w500'),
    backdropUrl: dto.backdrop_path ? getTmdbImageUrl(dto.backdrop_path, 'w780') : null,
    rating: Number(dto.vote_average) || 0,
    voteCount: dto.vote_count || 0,
    popularity: dto.popularity || 0,
    year: formatYear(dto.release_date),
    releaseDate: dto.release_date || '',
    genreIds,
    genreNames: genreNames.length > 0 ? genreNames : ['Geral'],
  }
}

export function buildGenreMap(genres: TmdbGenre[]): Record<number, string> {
  const map: Record<number, string> = {}
  for (const genre of genres) {
    map[genre.id] = genre.name
  }
  return map
}
