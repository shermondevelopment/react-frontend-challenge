import { Search, X } from 'lucide-react'
import { Input } from '@/shared/ui/input'

interface CastSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CastSearchInput({
  value,
  onChange,
  placeholder = 'Buscar ator...',
  className = '',
}: CastSearchInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-xs font-semibold text-foreground">Elenco</label>
      <div className="relative flex items-center">
        <Search
          className="absolute left-3 size-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 pl-9 pr-8 text-sm dark:border-white/10 dark:bg-white/5"
          aria-label="Buscar ator do elenco"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2.5 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            aria-label="Limpar busca de elenco"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
