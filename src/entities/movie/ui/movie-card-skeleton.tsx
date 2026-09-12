import { Skeleton } from '@/shared/ui/skeleton'

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" data-testid="movie-card-skeleton">
      <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
      <div className="space-y-2 pt-1">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  )
}
