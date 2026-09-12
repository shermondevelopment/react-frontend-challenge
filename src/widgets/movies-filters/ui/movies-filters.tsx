import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { UseMovieFiltersReturn } from '@/features/filter-movies'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  DialogDescription,
  DialogDrawerContent,
  DialogRoot,
  DialogTitle,
} from '@/shared/ui/dialog'
import { MoviesFiltersContent } from './movies-filters-content'

interface MoviesFiltersProps {
  filtersControl: UseMovieFiltersReturn
  className?: string
}

export function MoviesFilters({ filtersControl, className = '' }: MoviesFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <aside
        aria-label="Filtros de filmes"
        className={`hidden lg:block w-72 shrink-0 ${className}`}
      >
        <div className="sticky top-20 rounded-2xl border border-border bg-card p-5 shadow-xs dark:border-white/10 dark:bg-card/50">
          <MoviesFiltersContent filtersControl={filtersControl} />
        </div>
      </aside>

      <DialogRoot open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogDrawerContent className="w-full max-w-sm overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-base font-bold">Filtros Avançados</DialogTitle>
            <DialogDescription className="sr-only">
              Painel de filtros para busca de filmes
            </DialogDescription>
          </div>
          <MoviesFiltersContent
            filtersControl={filtersControl}
            showTitle={false}
            onApply={() => setMobileOpen(false)}
          />
        </DialogDrawerContent>
      </DialogRoot>
    </>
  )
}

export function MobileFiltersTrigger({
  filtersControl,
  onClick,
}: {
  filtersControl: UseMovieFiltersReturn
  onClick?: () => void
}) {
  const { activeFilterCount } = filtersControl
  const [open, setOpen] = useState(false)

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setOpen(true)
          if (onClick) onClick()
        }}
        className="relative lg:hidden h-10 gap-2 rounded-xl px-3 font-semibold dark:border-white/10 dark:bg-white/5 cursor-pointer"
        aria-label="Abrir filtros avançados"
      >
        <SlidersHorizontal className="size-4 text-primary" />
        <span>Filtros</span>
        {activeFilterCount > 0 && (
          <Badge variant="pill" className="px-1.5 py-0 text-[10px] font-bold">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <DialogDrawerContent className="w-full max-w-sm overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <DialogTitle className="text-base font-bold">Filtros Avançados</DialogTitle>
          <DialogDescription className="sr-only">
            Painel de filtros para busca de filmes
          </DialogDescription>
        </div>
        <MoviesFiltersContent
          filtersControl={filtersControl}
          showTitle={false}
          onApply={() => setOpen(false)}
        />
      </DialogDrawerContent>
    </DialogRoot>
  )
}
