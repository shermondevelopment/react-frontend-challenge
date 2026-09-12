import type { AgeRating } from './types'

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatYear(year: number): string {
  return year.toString()
}

export function formatDuration(minutes?: number): string {
  if (!minutes) return ''
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours === 0) return `${remainingMinutes}min`
  return `${hours}h ${remainingMinutes}min`
}

export function getAgeRatingColor(ageRating: AgeRating): string {
  switch (ageRating) {
    case 'L':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    case '10+':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case '12+':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case '14+':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case '16+':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case '18+':
      return 'bg-neutral-900 text-red-500 border-red-600/40'
    default:
      return 'bg-white/10 text-white border-white/20'
  }
}
