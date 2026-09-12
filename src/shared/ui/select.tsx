import { Select as SelectPrimitive } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value?: string
  defaultValue?: string
  options: readonly SelectOption[] | SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
  onValueChange?: (value: string) => void
  'aria-label'?: string
}

export function Select({
  value,
  defaultValue,
  options,
  placeholder = 'Selecione...',
  disabled,
  className,
  onValueChange,
  'aria-label': ariaLabel,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(val) => {
        if (typeof val === 'string' && onValueChange) {
          onValueChange(val)
        }
      }}
      aria-label={ariaLabel}
    >
      <SelectPrimitive.Trigger
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10',
          className
        )}
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 opacity-60 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={6} className="z-50 min-w-[var(--anchor-width)]">
          <SelectPrimitive.Popup className="max-h-60 overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-neutral-900/95">
            <SelectPrimitive.List className="space-y-0.5">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-primary/10 hover:text-primary data-[highlighted]:bg-primary/15 data-[highlighted]:text-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground dark:hover:bg-white/10 dark:data-[highlighted]:bg-white/10 dark:data-[selected]:bg-primary dark:data-[selected]:text-white"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ml-2">
                    <Check className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
