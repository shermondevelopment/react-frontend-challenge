import { Play, Film } from 'lucide-react'
import { useState } from 'react'
import type { MovieTrailer } from '@/entities/movie'
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from '@/shared/ui/dialog'

interface MovieTrailerSectionProps {
  trailer?: MovieTrailer | null
  movieTitle: string
}

export function MovieTrailerSection({ trailer, movieTitle }: MovieTrailerSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!trailer) {
    return null
  }

  return (
    <section className="space-y-4" data-testid="movie-trailer-section">
      <div className="flex items-center gap-2">
        <Film className="size-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Trailer Oficial
        </h2>
      </div>

      <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
          data-testid="trailer-thumbnail-button"
          aria-label={`Assistir trailer oficial de ${movieTitle}`}
          className="group relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-neutral-900 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:ring-primary/40 cursor-pointer"
        >
          <img
            src={trailer.thumbnailUrl}
            alt={`Thumbnail do trailer de ${movieTitle}`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid size-16 place-items-center rounded-full border border-white/30 bg-primary/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-primary">
              <Play className="size-7 fill-white translate-x-0.5" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="font-bold text-sm sm:text-base line-clamp-1 drop-shadow-md">
              {trailer.name}
            </span>
            <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-xs font-semibold backdrop-blur-md">
              YouTube
            </span>
          </div>
        </div>

        <DialogContent className="max-w-4xl p-2 bg-black border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <DialogTitle className="text-sm font-bold text-white line-clamp-1">
              {movieTitle} — Trailer Oficial
            </DialogTitle>
            <DialogDescription className="sr-only">
              Player de vídeo do trailer oficial
            </DialogDescription>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {isOpen && (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={`Trailer de ${movieTitle}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </DialogRoot>
    </section>
  )
}
