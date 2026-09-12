import { MAX_YEAR, MIN_YEAR } from '@/shared/constants/movie-constants'
import { Slider } from '@/shared/ui/slider'

interface YearRangeFilterProps {
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
}

export function YearRangeFilter({ value, onChange, className = '' }: YearRangeFilterProps) {
  const [minYear, maxYear] = value

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-foreground">Ano de Lançamento</span>
        <span className="font-bold text-primary dark:text-primary-foreground">
          {minYear} – {maxYear}
        </span>
      </div>

      <div className="px-1">
        <Slider
          value={[minYear, maxYear]}
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          onValueChange={(val) => {
            if (Array.isArray(val) && val.length === 2) {
              onChange([val[0], val[1]])
            }
          }}
          aria-label="Filtrar por ano de lançamento"
        />
      </div>

      <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
        <span>{MIN_YEAR}</span>
        <span>{MAX_YEAR}</span>
      </div>
    </div>
  )
}
