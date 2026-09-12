import { Link } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  Film,
  Star,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Movie } from '@/entities/movie'
import {
  formatRating,
  formatReleaseDate,
  getGenreNames,
  useMovieGenres,
} from '@/entities/movie'
import { selectWatchlistItems, useWatchlistStore } from '@/features/watchlist'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface WatchlistTableProps {
  className?: string
}

export function WatchlistTable({ className = '' }: WatchlistTableProps) {
  const items = useWatchlistStore(selectWatchlistItems)
  const remove = useWatchlistStore((state) => state.remove)
  const { data: genres } = useMovieGenres()

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'title', desc: false },
  ])

  const columns = useMemo<ColumnDef<Movie>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
        cell: ({ row }) => {
          const movie = row.original
          return (
            <div className="flex items-center gap-3">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="size-12 rounded-lg object-cover shadow-xs ring-1 ring-white/10 shrink-0"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=150&q=80'
                }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{movie.title}</span>
                {movie.originalTitle && movie.originalTitle !== movie.title && (
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {movie.originalTitle}
                  </span>
                )}
              </div>
            </div>
          )
        },
      },
      {
        id: 'genre',
        header: 'Gênero',
        accessorFn: (row) => getGenreNames(row, genres)[0] || '',
        cell: ({ row }) => {
          const genreNames = getGenreNames(row.original, genres)
          return (
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {genreNames.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="pill"
                  className="px-2 py-0.5 text-[11px] font-medium"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )
        },
      },
      {
        accessorKey: 'releaseDate',
        header: 'Lançamento',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground whitespace-nowrap">
            <Calendar className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span>{formatReleaseDate(row.original.releaseDate)}</span>
          </div>
        ),
      },
      {
        accessorKey: 'rating',
        header: 'Avaliação',
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 font-bold text-foreground whitespace-nowrap">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>{formatRating(row.original.rating)}</span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="block text-right">Ações</span>,
        enableSorting: false,
        cell: ({ row }) => {
          const movie = row.original
          return (
            <div className="text-right whitespace-nowrap">
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => remove(movie.id)}
                data-testid={`remove-watchlist-${movie.id}`}
                aria-label={`Remover ${movie.title} da watchlist`}
                className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )
        },
      },
    ],
    [genres, remove]
  )

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const renderSortIcon = (isSorted: false | 'asc' | 'desc') => {
    if (!isSorted) {
      return <ArrowUpDown className="size-3.5 opacity-40 group-hover:opacity-100" />
    }
    return isSorted === 'asc' ? (
      <ArrowUp className="size-3.5 text-primary" />
    ) : (
      <ArrowDown className="size-3.5 text-primary" />
    )
  }

  if (items.length === 0) {
    return (
      <div
        data-testid="watchlist-empty-state"
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center dark:border-white/10"
      >
        <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary dark:bg-white/5">
          <Film className="size-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Nenhum filme na sua Watchlist</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Explore o catálogo e adicione filmes aos favoritos clicando no ícone de coração.
          </p>
        </div>
        <Link
          to="/discovery"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
        >
          Explorar Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {items.length} {items.length === 1 ? 'filme salvo' : 'filmes salvos'}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs dark:border-white/10 dark:bg-neutral-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" data-testid="watchlist-table">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider dark:border-white/10 dark:bg-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const isSorted = header.column.getIsSorted()

                    return (
                      <th key={header.id} scope="col" className="px-6 py-4">
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              canSort
                                ? 'group inline-flex items-center gap-2 font-bold text-foreground hover:text-primary cursor-pointer select-none'
                                : 'font-bold text-foreground'
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            role={canSort ? 'button' : undefined}
                            tabIndex={canSort ? 0 : undefined}
                            onKeyDown={(e) => {
                              if (canSort && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault()
                                header.column.getToggleSortingHandler()?.(e)
                              }
                            }}
                          >
                            <span>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            {canSort && renderSortIcon(isSorted)}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-border dark:divide-white/10">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-testid={`watchlist-row-${row.original.id}`}
                  className="transition-colors hover:bg-muted/40 dark:hover:bg-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
