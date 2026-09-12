export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularidade' },
  { value: 'vote_average.desc', label: 'Maior Nota' },
  { value: 'primary_release_date.desc', label: 'Mais Recentes' },
  { value: 'title.asc', label: 'Título (A-Z)' },
] as const

export const DEFAULT_YEAR_RANGE: [number, number] = [1990, 2026]
export const MIN_YEAR = 1970
export const MAX_YEAR = 2026

export const MIN_RATING = 0
export const MAX_RATING = 10

export const DEFAULT_PAGE_SIZE = 20
