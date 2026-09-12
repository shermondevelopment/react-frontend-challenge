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

export function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return ''
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${remaining}m`
  if (remaining === 0) return `${hours}h`
  return `${hours}h ${remaining}m`
}

export function extractCertification(releaseDates?: TmdbMovieDto['release_dates']): string {
  if (!releaseDates?.results || releaseDates.results.length === 0) {
    return '14+'
  }

  const brRelease = releaseDates.results.find((r) => r.iso_3166_1 === 'BR')
  if (brRelease) {
    const cert = brRelease.release_dates.find((d) => Boolean(d.certification?.trim()))?.certification?.trim()
    if (cert) {
      if (cert.toUpperCase() === 'L' || cert === '0') return 'Livre'
      return cert.endsWith('+') ? cert : `${cert}+`
    }
  }

  const usRelease = releaseDates.results.find((r) => r.iso_3166_1 === 'US')
  if (usRelease) {
    const cert = usRelease.release_dates.find((d) => Boolean(d.certification?.trim()))?.certification?.trim()
    if (cert) {
      if (cert === 'PG-13') return '14+'
      if (cert === 'R') return '16+'
      if (cert === 'NC-17') return '18+'
      if (cert === 'PG') return '10+'
      if (cert === 'G') return 'Livre'
      return cert
    }
  }

  for (const item of releaseDates.results) {
    const cert = item.release_dates.find((d) => Boolean(d.certification?.trim()))?.certification?.trim()
    if (cert) return cert
  }

  return '14+'
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
    backdropUrl: dto.backdrop_path ? getTmdbImageUrl(dto.backdrop_path, 'original') : null,
    rating: Number(dto.vote_average) || 0,
    voteCount: dto.vote_count || 0,
    popularity: dto.popularity || 0,
    year: formatYear(dto.release_date),
    releaseDate: dto.release_date || '',
    genreIds,
    genreNames: genreNames.length > 0 ? genreNames : ['Geral'],
  }
}

export function extractTrailer(videos?: TmdbMovieDto['videos']): import('./types').MovieTrailer | null {
  if (!videos?.results || videos.results.length === 0) return null

  const youtubeVideos = videos.results.filter(
    (v) => v.site.toLowerCase() === 'youtube' && Boolean(v.key)
  )

  const officialTrailer =
    youtubeVideos.find((v) => v.type.toLowerCase() === 'trailer' && v.official) ||
    youtubeVideos.find((v) => v.type.toLowerCase() === 'trailer') ||
    youtubeVideos.find((v) => v.type.toLowerCase() === 'teaser') ||
    youtubeVideos[0]

  if (!officialTrailer) return null

  return {
    id: officialTrailer.id,
    key: officialTrailer.key,
    name: officialTrailer.name,
    site: officialTrailer.site,
    url: `https://www.youtube.com/watch?v=${officialTrailer.key}`,
    thumbnailUrl: `https://img.youtube.com/vi/${officialTrailer.key}/hqdefault.jpg`,
  }
}

export function extractDirector(credits?: TmdbMovieDto['credits']): string {
  if (!credits?.crew || credits.crew.length === 0) return 'Diretor não informado'
  const director = credits.crew.find((member) => member.job?.toLowerCase() === 'director')
  return director?.name || 'Diretor não informado'
}

export function extractCast(credits?: TmdbMovieDto['credits']): import('./types').MovieCastMember[] {
  if (!credits?.cast || credits.cast.length === 0) return []
  return credits.cast.slice(0, 8).map((actor) => ({
    id: actor.id,
    name: actor.name,
    character: actor.character || 'Personagem',
    profileUrl: actor.profile_path ? getTmdbImageUrl(actor.profile_path, 'w185') : null,
  }))
}

export function mapTmdbMovieDetailsToEntity(
  dto: TmdbMovieDto,
  genreMap: Record<number, string> = DEFAULT_TMDB_GENRES
): import('./types').MovieDetails {
  const base = mapTmdbMovieToEntity(dto, genreMap)
  const certification = extractCertification(dto.release_dates)
  const trailer = extractTrailer(dto.videos)
  const director = extractDirector(dto.credits)
  const cast = extractCast(dto.credits)

  return {
    ...base,
    runtime: dto.runtime,
    durationFormatted: formatDuration(dto.runtime),
    tagline: dto.tagline || '',
    status: dto.status || 'Lançado',
    director,
    certification,
    ageRatingFormatted: certification === 'Livre' ? 'Livre' : `${certification} (Recomendado)`,
    languages: dto.spoken_languages?.map((lang) => lang.name || lang.english_name) || ['Português'],
    studios: dto.production_companies?.map((studio) => studio.name) || ['CineDash Originals'],
    trailer,
    cast,
  }
}

export function buildGenreMap(genres: TmdbGenre[]): Record<number, string> {
  const map: Record<number, string> = {}
  for (const genre of genres) {
    map[genre.id] = genre.name
  }
  return map
}
