import {
  Building2,
  Calendar,
  Clock,
  FileText,
  Globe2,
  ShieldAlert,
  UserCheck,
} from 'lucide-react'
import type { MovieDetails } from '@/entities/movie'
import { formatReleaseDate } from '@/entities/movie'
import { MovieTrailerSection } from './movie-trailer-section'

interface MovieOverviewProps {
  movie: MovieDetails
}

export function MovieOverview({ movie }: MovieOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Sinopse
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {movie.synopsis || 'Nenhuma sinopse disponível para este filme.'}
          </p>
        </section>

        {movie.trailer && (
          <MovieTrailerSection trailer={movie.trailer} movieTitle={movie.title} />
        )}
      </div>

      <aside aria-label="Informações técnicas" className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs dark:border-white/10 dark:bg-neutral-900/40">
          <h3 className="text-base font-bold text-foreground pb-4 border-b border-border dark:border-white/10">
            Ficha Técnica
          </h3>

          <div className="divide-y divide-border/60 dark:divide-white/5 text-sm">
            {movie.director && movie.director !== 'Diretor não informado' && (
              <div className="py-3.5 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <UserCheck className="size-3.5" />
                  Diretor
                </span>
                <span className="font-semibold text-foreground text-right">{movie.director}</span>
              </div>
            )}

            {movie.status && (
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Status</span>
                <span className="font-semibold text-foreground">{movie.status}</span>
              </div>
            )}

            {movie.ageRatingFormatted && (
              <div className="py-3.5 flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5 text-amber-500" />
                  Classificação
                </span>
                <span className="font-semibold text-foreground text-right">
                  {movie.ageRatingFormatted}
                </span>
              </div>
            )}

            {movie.releaseDate && (
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  Lançamento
                </span>
                <span className="font-semibold text-foreground">
                  {formatReleaseDate(movie.releaseDate)}
                </span>
              </div>
            )}

            {movie.durationFormatted && (
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  Duração
                </span>
                <span className="font-semibold text-foreground">{movie.durationFormatted}</span>
              </div>
            )}

            {movie.languages && movie.languages.length > 0 && (
              <div className="py-3.5 flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Globe2 className="size-3.5" />
                  Idiomas
                </span>
                <span className="font-semibold text-foreground text-right">
                  {movie.languages.slice(0, 3).join(', ')}
                </span>
              </div>
            )}

            {movie.studios && movie.studios.length > 0 && (
              <div className="py-3.5 flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="size-3.5" />
                  Produção
                </span>
                <span className="font-semibold text-foreground text-right">
                  {movie.studios.slice(0, 2).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}
