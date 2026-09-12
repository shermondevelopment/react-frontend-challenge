import { useParams } from '@tanstack/react-router'
import { Header } from '@/widgets/header'
import { MovieDetailsContent } from '@/widgets/movie-details'

export function MovieDetailsPage() {
  const { id } = useParams({ from: '/movie/$id' })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="w-full">
        <MovieDetailsContent movieId={id} />
      </main>
    </div>
  )
}
