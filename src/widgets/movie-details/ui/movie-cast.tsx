import { User } from 'lucide-react'
import type { MovieCastMember } from '@/entities/movie'

interface MovieCastProps {
  cast?: MovieCastMember[]
}

export function MovieCast({ cast = [] }: MovieCastProps) {
  if (cast.length === 0) return null

  return (
    <section className="space-y-6" data-testid="movie-cast-section">
      <div className="flex items-center justify-between border-b border-border pb-3 dark:border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Elenco Principal
        </h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {cast.length} {cast.length === 1 ? 'ator' : 'atores'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {cast.map((actor) => (
          <div
            key={actor.id}
            data-testid={`cast-card-${actor.id}`}
            className="group flex flex-col items-center text-center p-3 rounded-2xl border border-border/60 bg-card/60 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="relative mb-3 size-20 overflow-hidden rounded-full ring-2 ring-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary">
              {actor.profileUrl ? (
                <img
                  src={actor.profileUrl}
                  alt={actor.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center bg-muted text-muted-foreground">
                  <User className="size-8 opacity-60" />
                </div>
              )}
            </div>

            <span
              title={actor.name}
              className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary"
            >
              {actor.name}
            </span>

            <span
              title={actor.character}
              className="line-clamp-1 text-xs font-medium text-muted-foreground"
            >
              {actor.character}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
