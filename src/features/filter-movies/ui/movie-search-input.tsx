import { Search, X } from 'lucide-react'
import { Input } from '@/shared/ui/input'

interface MovieSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MovieSearchInput({
  value,
  onChange,
  placeholder = 'Buscar filme por título...',
  className = '',
}: MovieSearchInputProps) {
  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <Search
        className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 pl-10 pr-9 text-sm rounded-xl border-border bg-background shadow-xs dark:border-white/10 dark:bg-white/5"
        aria-label="Buscar filmes por título"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          aria-label="Limpar busca de filme"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
