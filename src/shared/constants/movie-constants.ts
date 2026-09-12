export const MOVIE_GENRES = [
  'Ação',
  'Drama',
  'Comédia',
  'Ficção Científica',
  'Terror',
  'Romance',
  'Thriller',
  'Animação',
  'Documentário',
] as const

export type MovieGenre = (typeof MOVIE_GENRES)[number]

export const AGE_RATINGS = [
  { value: 'ALL', label: 'Todas as classificações' },
  { value: 'L', label: 'Livre' },
  { value: '10+', label: '10+' },
  { value: '12+', label: '12+' },
  { value: '14+', label: '14+ (Recomendado)' },
  { value: '16+', label: '16+' },
  { value: '18+', label: '18+' },
] as const

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularidade' },
  { value: 'rating', label: 'Maior Nota' },
  { value: 'latest', label: 'Mais Recentes' },
  { value: 'title', label: 'Título (A-Z)' },
] as const

export const DEFAULT_YEAR_RANGE: [number, number] = [1990, 2025]
export const MIN_YEAR = 1990
export const MAX_YEAR = 2025

export const MIN_RATING = 0
export const MAX_RATING = 10

export const DEFAULT_PAGE_SIZE = 8
