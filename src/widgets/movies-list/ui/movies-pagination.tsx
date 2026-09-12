import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface MoviesPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function MoviesPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: MoviesPaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav
      role="navigation"
      aria-label="Paginação de filmes"
      className={`flex items-center justify-center gap-2 py-6 ${className}`}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 gap-1.5 rounded-xl px-3 text-xs font-semibold dark:border-white/10 dark:bg-white/5 cursor-pointer disabled:opacity-30"
        aria-label="Página anterior"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-xs font-medium text-muted-foreground">
                ...
              </span>
            )
          }

          const pageNum = p as number
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Ir para página ${pageNum}`}
              className={`size-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'border border-primary bg-primary text-primary-foreground shadow-[0_0_14px_rgba(124,58,237,0.4)]'
                  : 'border border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
              }`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 gap-1.5 rounded-xl px-3 text-xs font-semibold dark:border-white/10 dark:bg-white/5 cursor-pointer disabled:opacity-30"
        aria-label="Próxima página"
      >
        <span className="hidden sm:inline">Próximo</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}
