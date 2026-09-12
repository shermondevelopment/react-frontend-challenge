import { Skeleton } from '@/shared/ui/skeleton'

export function MovieDetailsSkeleton() {
  return (
    <div className="w-full space-y-8" data-testid="movie-details-skeleton">
      <div className="relative h-[480px] w-full overflow-hidden bg-muted/40 rounded-3xl animate-pulse">
        <div className="mx-auto max-w-[1440px] px-6 pt-32 flex gap-8 items-end h-full pb-10">
          <Skeleton className="h-64 w-44 rounded-2xl shrink-0" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-44 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
