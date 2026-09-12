import { ArrowUpDown } from 'lucide-react'
import type { MovieSortOption } from '@/entities/movie'
import { SORT_OPTIONS } from '@/shared/constants/movie-constants'
import { Select } from '@/shared/ui/select'

interface SortSelectProps {
  value: MovieSortOption
  onChange: (value: MovieSortOption) => void
  className?: string
}

export function SortSelect({ value, onChange, className = '' }: SortSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="hidden text-xs font-semibold text-muted-foreground sm:inline-flex items-center gap-1.5">
        <ArrowUpDown className="size-3.5" aria-hidden="true" />
        Ordenar por:
      </span>
      <div className="w-48">
        <Select
          value={value}
          options={SORT_OPTIONS}
          onValueChange={(val) => onChange(val as MovieSortOption)}
          aria-label="Ordenar filmes por"
        />
      </div>
    </div>
  )
}
