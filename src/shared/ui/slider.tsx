import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from '@/shared/lib/utils'

interface SliderProps {
  value?: number | number[]
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number | number[]) => void
  onValueCommitted?: (value: number | number[]) => void
  className?: string
  'aria-label'?: string
}

export function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  onValueCommitted,
  'aria-label': ariaLabel,
}: SliderProps) {
  const currentValue = value ?? defaultValue
  const isArrayValue = Array.isArray(currentValue)
  const thumbsCount = isArrayValue ? (currentValue as number[]).length : 1

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(val) => {
        if (onValueChange) {
          onValueChange(val)
        }
      }}
      onValueCommitted={(val) => {
        if (onValueCommitted) {
          onValueCommitted(val)
        }
      }}
      aria-label={ariaLabel}
      className={cn('relative flex w-full touch-none select-none items-center py-2', className)}
    >
      <SliderPrimitive.Control className="relative flex w-full items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
          <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbsCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            className="block size-4 rounded-full border-2 border-primary bg-white shadow-sm transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-white"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}
