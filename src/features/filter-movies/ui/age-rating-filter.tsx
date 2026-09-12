import { AGE_RATINGS } from '@/shared/constants/movie-constants'
import { Select } from '@/shared/ui/select'

interface AgeRatingFilterProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function AgeRatingFilter({ value, onChange, className = '' }: AgeRatingFilterProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-xs font-semibold text-foreground">
        Classificação Indicativa
      </label>
      <Select
        value={value}
        options={AGE_RATINGS}
        placeholder="Selecione a classificação"
        onValueChange={onChange}
        aria-label="Selecionar classificação indicativa"
      />
    </div>
  )
}
