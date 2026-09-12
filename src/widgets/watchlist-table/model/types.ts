export type WatchlistSortField = 'title' | 'genre' | 'releaseDate' | 'rating'
export type SortOrder = 'asc' | 'desc'

export interface WatchlistTableSortState {
  field: WatchlistSortField
  order: SortOrder
}
