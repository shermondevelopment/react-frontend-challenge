import { MAX_RATING, MIN_RATING } from '@/shared/constants/movie-constants'
import { Badge } from '@/shared/ui/badge'
import { Slider } from '@/shared/ui/slider'

interface RatingSliderFilterProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function RatingSliderFilter({ value, onChange, className = '' }: RatingSliderFilterProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-foreground">Nota Mínima</span>
        <Badge
          variant="pill"
          className="px-2 py-0.5 text-xs font-bold"
          data-testid="min-rating-badge"
        >
          {value > 0 ? value.toFixed(1) : 'Todas'}
        </Badge>
      </div>

      <div className="px-1">
        <Slider
          value={value}
          min={MIN_RATING}
          max={MAX_RATING}
          step={0.5}
          onValueChange={(val) => {
            const num = Array.isArray(val) ? val[0] : val
            onChange(num)
          }}
          aria-label="Filtrar por nota mínima"
        />
      </div>

      <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
        <span>{MIN_RATING}</span>
        <span>{MAX_RATING}</span>
      </div>
    </div>
  )
}
