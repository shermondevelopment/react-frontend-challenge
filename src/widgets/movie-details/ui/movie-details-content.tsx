import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useMovieDetail } from '@/entities/movie'
import { Button } from '@/shared/ui/button'
import { MovieCast } from './movie-cast'
import { MovieDetailsSkeleton } from './movie-details-skeleton'
import { MovieHero } from './movie-hero'
import { MovieOverview } from './movie-overview'

interface MovieDetailsContentProps {
  movieId: string
  className?: string
}

export function MovieDetailsContent({ movieId, className = '' }: MovieDetailsContentProps) {
  const { data: movie, isLoading, isError, error, refetch } = useMovieDetail(movieId)

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (isError || !movie) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 py-24 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">Filme não encontrado</h2>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Não foi possível carregar os detalhes do filme.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            className="gap-2 font-semibold cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
          <Link
            to="/discovery"
            className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className={`w-full space-y-12 ${className}`} data-testid="movie-details-content">
      <MovieHero movie={movie} />
      <div className="mx-auto max-w-[1440px] px-4 space-y-14 pb-20 sm:px-8 lg:px-10">
        <MovieOverview movie={movie} />
        {movie.cast && movie.cast.length > 0 && <MovieCast cast={movie.cast} />}
      </div>
    </article>
  )
}
