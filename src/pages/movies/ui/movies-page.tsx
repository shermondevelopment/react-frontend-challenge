import { useMovieFilters } from '@/features/filter-movies'
import { Header } from '@/widgets/header'
import { MoviesFilters } from '@/widgets/movies-filters'
import { MoviesList } from '@/widgets/movies-list'

export function MoviesPage() {
  const filtersControl = useMovieFilters()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <MoviesFilters filtersControl={filtersControl} />

          <MoviesList filtersControl={filtersControl} />
        </div>
      </main>
    </div>
  )
}
